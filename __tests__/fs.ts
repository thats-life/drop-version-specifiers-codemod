import * as Bun from "bun";

export function writeFile(importStatement: string) {
  return Bun.write(
    `tmp/${Bun.hash.rapidhash(importStatement)}.tsx`,
    importStatement
  );
}
export function rmDir(dir: string) {
  return Bun.$`rm -rf ${[dir]}`;
}
