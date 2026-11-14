#!/usr/bin/env node
/**
 * HAULIX Mobile — Doctor Script
 * Runs health checks on the development environment.
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

let pass = 0;
let fail = 0;
const warnings = [];

function check(label, fn) {
  try {
    fn();
    console.log(`  ✅  ${label}`);
    pass++;
  } catch (err) {
    console.log(`  ❌  ${label}: ${err.message}`);
    fail++;
  }
}

function warn(label, fn) {
  try {
    fn();
    console.log(`  ✅  ${label}`);
  } catch (err) {
    console.log(`  ⚠️   ${label}: ${err.message}`);
    warnings.push(label);
  }
}

function cmd(command, cwd = ROOT) {
  return execSync(command, { cwd, stdio: "pipe", encoding: "utf8" }).trim();
}

console.log("\n🩺  HAULIX Mobile — Doctor\n");

// ── Tool versions ────────────────────────────────────────────────────────────
console.log("Tool Versions:");
check("Node.js >= 20", () => {
  const v = process.version.replace("v", "").split(".").map(Number);
  if (v[0] < 20) throw new Error(`Found ${process.version}`);
});

check("pnpm installed", () => {
  cmd("pnpm --version");
});

warn("Git installed", () => {
  cmd("git --version");
});

// ── Workspace files ───────────────────────────────────────────────────────────
console.log("\nWorkspace Files:");
const requiredFiles = [
  "package.json",
  "pnpm-workspace.yaml",
  "turbo.json",
  "biome.json",
  "tsconfig.base.json",
  ".gitignore",
  ".editorconfig",
  "apps/customer/package.json",
  "apps/customer/app.config.ts",
  "apps/driver/package.json",
  "apps/driver/app.config.ts",
  "packages/design-tokens/src/index.ts",
  "packages/logger/src/index.ts",
  "packages/utils/src/index.ts",
  "packages/ui/src/index.ts",
  "packages/i18n/src/index.ts",
];

for (const f of requiredFiles) {
  check(f, () => {
    if (!existsSync(resolve(ROOT, f))) throw new Error("Not found");
  });
}

// ── node_modules installed ────────────────────────────────────────────────────
console.log("\nDependencies:");
check("node_modules exists", () => {
  if (!existsSync(resolve(ROOT, "node_modules"))) throw new Error("Run pnpm install first");
});

check(".env.example files exist", () => {
  if (!existsSync(resolve(ROOT, "apps/customer/.env.example")))
    throw new Error("apps/customer/.env.example missing");
  if (!existsSync(resolve(ROOT, "apps/driver/.env.example")))
    throw new Error("apps/driver/.env.example missing");
});

// ── Git hooks ────────────────────────────────────────────────────────────────
console.log("\nGit Hooks:");
warn(".husky/pre-commit exists", () => {
  if (!existsSync(resolve(ROOT, ".husky/pre-commit")))
    throw new Error(".husky/pre-commit missing — run: pnpm prepare");
});

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`  Results: ${pass} passed, ${fail} failed, ${warnings.length} warnings`);
if (fail > 0) {
  console.log("  ❌  Some checks failed. Fix issues before continuing.\n");
  process.exit(1);
} else if (warnings.length > 0) {
  console.log("  ⚠️   Setup complete with warnings. Review above.\n");
} else {
  console.log("  🎉  Everything looks good!\n");
}
