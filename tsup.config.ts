import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  treeshake: true,
  // Runtime deps are installed by the consumer, not bundled into the library.
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "radix-ui",
    "@radix-ui/react-slot",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
});
