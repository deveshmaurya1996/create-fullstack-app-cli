/**
 * Reads docs/structure.md ASCII tree and creates missing files (never overwrites).
 * Box-drawing chars: | (U+2502), + (U+251C), L (U+2514), - (U+2500)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const docPath = path.join(root, "docs", "structure.md");

const H = "\u2500";

function branchCharIndex(line) {
  const iT = line.indexOf("\u251c");
  const iL = line.indexOf("\u2514");
  if (iT === -1 && iL === -1) return -1;
  const a = iT === -1 ? 1e9 : iT;
  const b = iL === -1 ? 1e9 : iL;
  return Math.min(a, b);
}

function shouldParseLine(line) {
  return branchCharIndex(line) >= 0 && line.includes(H + H);
}

function relImportToPluginsTypes(fromFile) {
  const dir = path.dirname(fromFile);
  const target = path.join(root, "src", "plugins", "types.ts");
  let rel = path.relative(dir, target);
  rel = rel.replace(/\\/g, "/").replace(/\.ts$/i, ".js");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel;
}

function stripAnnotation(name) {
  return name.replace(/\s+←[\s\S]*$/, "").trim();
}

function metaStub(id, category, importTypes) {
  return `import type { PluginMeta } from "${importTypes}";

export const meta: PluginMeta = {
  id: ${JSON.stringify(id)},
  category: ${JSON.stringify(category)},
};
`;
}

function fileMapStub(importTypes) {
  return `import type { FileMap } from "${importTypes}";

export const fileMap: FileMap = {
  entries: [],
};
`;
}

function hbsStub(relPath) {
  return `{{! ${relPath.replace(/\\/g, "/")} — scaffolded placeholder }}\n`;
}

function tsStub(relFromRoot) {
  return `/**\n * ${relFromRoot.replace(/\\/g, "/")} — scaffolded; wire up per docs/structure.md\n */\nexport {};\n`;
}

function normRel(relPath) {
  return relPath.split(path.sep).join("/");
}

function isPluginPackTs(absPath, relPath) {
  const n = normRel(relPath);
  if (n.startsWith("src/plugins/")) return true;
  if (/\/fixtures\/mock-plugins\//.test(n) || /\\fixtures\\mock-plugins\\/.test(relPath)) return true;
  return false;
}

function main() {
  const text = fs.readFileSync(docPath, "utf8");
  const lines = text.split(/\r?\n/);
  const folderStack = [];

  let created = 0;
  let skipped = 0;

  for (const line of lines) {
    if (!shouldParseLine(line)) continue;

    const i = branchCharIndex(line);
    const depth = i / 4;
    while (folderStack.length > depth) folderStack.pop();

    const branchIdx = line.indexOf(H + H, i);
    if (branchIdx === -1) continue;
    const afterBranch = line.slice(branchIdx + 2).trim();
    const raw = stripAnnotation(afterBranch);
    if (!raw || raw === "create-fullstack-app/") continue;

    const isDir = raw.endsWith("/");
    const name = isDir ? raw.slice(0, -1) : raw;

    if (isDir) {
      folderStack.push(name);
      continue;
    }

    const relPath = path.join(...folderStack, name);
    const absPath = path.join(root, relPath);

    if (fs.existsSync(absPath)) {
      skipped++;
      continue;
    }

    fs.mkdirSync(path.dirname(absPath), { recursive: true });

    if (name.endsWith(".hbs")) {
      fs.writeFileSync(absPath, hbsStub(relPath), "utf8");
    } else if (name.endsWith(".ts") && isPluginPackTs(absPath, relPath)) {
      const parts = relPath.split(path.sep);
      const mockIdx = parts.indexOf("mock-plugins");
      const pluginsIdx = parts.indexOf("plugins");
      const baseDirParts =
        mockIdx >= 0 ? parts.slice(mockIdx + 1, -1) : parts.slice(pluginsIdx + 1, -1);
      const base = path.basename(name, ".ts");
      const importTypes = relImportToPluginsTypes(absPath);
      if (base === "meta") {
        const id = baseDirParts[baseDirParts.length - 1] ?? "unknown";
        const category = baseDirParts.slice(0, -1).join("/") || "uncategorized";
        fs.writeFileSync(absPath, metaStub(id, category, importTypes), "utf8");
      } else if (base === "file-map") {
        fs.writeFileSync(absPath, fileMapStub(importTypes), "utf8");
      } else {
        fs.writeFileSync(absPath, tsStub(relPath), "utf8");
      }
    } else if (name.endsWith(".ts")) {
      fs.writeFileSync(absPath, tsStub(relPath), "utf8");
    } else if (name.endsWith(".js")) {
      fs.writeFileSync(
        absPath,
        `/**\n * ${normRel(relPath)} — scaffolded\n */\nexport {};\n`,
        "utf8"
      );
    } else {
      fs.writeFileSync(absPath, "", "utf8");
    }
    created++;
  }

  console.log(`scaffold-structure-from-doc: created ${created}, skipped existing ${skipped}`);
}

main();
