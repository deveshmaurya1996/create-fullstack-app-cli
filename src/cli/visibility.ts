import type { FrontendChoice } from "../setup/types.js";
import type { RawPromptAnswers } from "./types.js";

export function isMobileAppType(a: Partial<RawPromptAnswers>): boolean {
  return a.projectType === "Mobile app";
}

export function wantsFrontend(a: Partial<RawPromptAnswers>): boolean {
  if (a.projectStructure === "Single app" && a.singleAppScope === "Backend only") return false;
  if (a.projectType === "API only") return false;
  return true;
}

export function wantsBackend(a: Partial<RawPromptAnswers>): boolean {
  if (isMobileAppType(a)) return false;
  if (a.projectStructure === "Single app" && a.singleAppScope === "Frontend only") return false;
  if (a.projectStructure === "Single app" && a.singleAppScope === "Backend only") return true;
  if (a.projectStructure === "Single app" && a.singleAppScope === "Full stack (frontend + backend)") {
    return true;
  }
  if (a.projectType === "API only") return true;
  if (a.projectType === "Full product (web + api)") return true;
  return Boolean(a.needBackend);
}

export function isMobileFrontendChoice(fe: FrontendChoice | undefined): boolean {
  if (!fe || fe === "None") return false;
  return (
    fe === "Expo (React Native)" || fe === "React Native (CLI)" || fe === "Flutter"
  );
}

export function isFlutterFrontend(fe: FrontendChoice | undefined): boolean {
  return fe === "Flutter";
}

export function wantsWebFrontendStack(a: Partial<RawPromptAnswers>): boolean {
  const fe = a.frontend;
  if (!fe || fe === "None" || isMobileFrontendChoice(fe)) return false;
  return wantsFrontend(a) && !isMobileAppType(a);
}

export function wantsReactNativeStylePackages(a: Partial<RawPromptAnswers>): boolean {
  const fe = a.frontend;
  if (fe === "Expo (React Native)" || fe === "React Native (CLI)") return true;
  if (isMobileAppType(a) && wantsFrontend(a) && fe && fe !== "Flutter" && fe !== "None") {
    return true;
  }
  return false;
}
