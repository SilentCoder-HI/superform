import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      "core/index": "packages/core/src/index.ts"
    },
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    sourcemap: true,
    bundle: true,
    minify: false,
    splitting: false,
  },
  {
    entry: {
      "react/index": "packages/react/src/index.ts"
    },
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: false,
    sourcemap: true,
    bundle: true,
    external: ["react", "@silentcoderhi/superform-core"],
    minify: false,
  }
]);