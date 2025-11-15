import { processFiles } from "./lib/core.ts";

export default (async () => {
  for (const task of processFiles({
    targetPath: __dirname,
  }))
    await task;
})();
