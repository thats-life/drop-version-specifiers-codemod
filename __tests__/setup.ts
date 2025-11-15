import { writeFile, rmDir } from "./fs";

await rmDir("tmp");

const setup = async () => {
  for await (const importStatement of [
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react";`,
    `import { useState } from "react;`,
  ]) {
    await writeFile(importStatement);
  }
};

await setup().catch(console.error);

process.on("exit", async () => {
  await rmDir("tmp");
});
