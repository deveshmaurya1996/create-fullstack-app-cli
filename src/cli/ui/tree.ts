export interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  annotation?: string;
}

export function renderTree(nodes: TreeNode[], prefix = '', _isLast = true): string {
  let output = '';

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const isLastNode = i === nodes.length - 1;
    const connector = isLastNode ? '└── ' : '├── ';
    const childPrefix = isLastNode ? '    ' : '│   ';

    const annotation = node.annotation ? ` ← ${node.annotation}` : '';

    output += `${prefix}${connector}${node.name}${annotation}\n`;

    if (node.children && node.children.length > 0) {
      output += renderTree(node.children, `${prefix}${childPrefix}`, isLastNode);
    }
  }

  return output;
}

export function buildTreeFromPaths(paths: Array<{ path: string; annotation?: string }>): TreeNode[] {
  const root: TreeNode = { name: '', type: 'directory', children: [] };

  for (const { path: filePath, annotation } of paths) {
    const parts = filePath.split('/').filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      let child = current.children?.find((c) => c.name === part);

      if (!child) {
        child = {
          name: part,
          type: isLast ? 'file' : 'directory',
          children: isLast ? undefined : [],
          annotation: isLast ? annotation : undefined,
        };
        current.children = current.children || [];
        current.children.push(child);
      }

      if (!isLast) {
        current = child;
      }
    }
  }

  sortTree(root);
  return root.children || [];
}

function sortTree(node: TreeNode): void {
  if (!node.children) return;

  node.children.sort((a, b) => {
    if (a.type === 'directory' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'directory') return 1;
    return a.name.localeCompare(b.name);
  });

  for (const child of node.children) {
    sortTree(child);
  }
}