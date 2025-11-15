import { processFiles } from "./lib/core.ts";

for (const task of processFiles({
  targetPath: __dirname,
}))
  await task;
