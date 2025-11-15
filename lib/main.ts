import { resolveArgs, processFiles } from "./core";

async function main() {
  const args = resolveArgs();
  let updatedCount = 0;
  for await (const wasModified of processFiles(args)) {
    updatedCount += wasModified ? 1 : 0;
  }
  console.log(`✅ Successfully updated ${updatedCount} file(s).`);
}
main().catch(console.error);
