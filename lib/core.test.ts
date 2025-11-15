import { afterAll, expect, test } from "bun:test";
import { processFiles, resolveArgs } from "./core";
import { Glob } from "bun";
import { rmDir } from "../__tests__/fs";

test("processFiles", async () => {
  const args = resolveArgs(["./tmp"]);
  let updatedCount = 0;
  for await (const wasModified of processFiles(args)) {
    updatedCount += wasModified ? 1 : 0;
  }
  expect(updatedCount).toBe(
    [...new Glob("**/*").scanSync({ cwd: "./tmp" })].length
  );
});

afterAll(async () => {
  await rmDir("tmp");
});
