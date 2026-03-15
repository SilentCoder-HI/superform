import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { "core/index": "packages/core/src/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    sourcemap: true,
    bundle: true,
  },
  {
    entry: { "react/index": "packages/react/src/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: false,
    sourcemap: true,
    external: ["react", "@silentcoderhi/superform-core"],
    bundle: true,
  },
]);
