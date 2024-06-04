import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react(!isProduction ? {
      jsxImportSource: '@welldone-software/why-did-you-render',
    } : undefined)],
    build: {
      lib: {
        entry: {
          components: path.resolve(__dirname, "./src/components/index.ts"),
          // utility: path.resolve(__dirname, './src/utility/index.ts'),
          // theme: path.resolve(__dirname, './src/lib/theme/theme.css'),
        },
        name: "react-minimal-table",
      },
      rollupOptions: {
        external: ["react", "react-dom", "styled-components"],
        output: {
          globals: {
            react: "react",
            "styled-components": "styled-components",
          },
        },
      },
      sourcemap: !isProduction,
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "#": path.resolve(__dirname, "./src"),
      },
    },
  };
});
