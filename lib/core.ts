#!/usr/bin/env bun

/**
 * Codemod to remove version specifiers (@x.y.z) from import statements
 *
 * Usage: bun remove-version-specifiers.ts [path]
 * If no path is provided, processes all .ts and .tsx files in src/
 */

import { Glob } from "bun";
import { VERSION_PATTERN } from "./constants";

async function* removeVersionSpecifiers(
  file: Bun.BunFile
): AsyncGenerator<boolean> {
  const content = await file.text();
  const shouldUpdate = content.match(VERSION_PATTERN);
  if (!shouldUpdate) {
    yield false;
    return;
  }
  const updatedContent = content.replace(VERSION_PATTERN, "");
  try {
    await file.write(updatedContent);
    console.log(`✅ Updated: ${file.name}`);
    yield true;
  } catch (error) {
    console.error(`Error writing file ${file.name}: ${error}`);
    yield false;
  }
}

export const resolveArgs = (args: string[] = process.argv.slice(2)) => {
  const [targetPath = "src"] = args;
  return { targetPath };
};

export async function* processFiles(args: { targetPath: string }) {
  const { targetPath } = args;

  for await (const path of new Glob(`**/*.{ts,tsx,js,jsx}`).scan({
    cwd: targetPath,
    absolute: true,
  })) {
    if (path.includes("node_modules")) continue;
    yield* removeVersionSpecifiers(Bun.file(path));
  }
}
