import { definePlugins } from "@gera2ld/plaid-rollup"
import { readPackageUp } from "read-package-up"
import { defineConfig } from "rollup"
import userscript from "rollup-plugin-userscript"

const { packageJson } = await readPackageUp()

export default defineConfig(
  Object.entries({
    "google-scholar-in-google": "src/script/index.ts",
  }).map(([name, entry]) => ({
    input: entry,
    plugins: [
      ...definePlugins({
        esm: true,
        minimize: false,
        postcss: {
          inject: false,
          minimize: true,
        },
        extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
      }),
      userscript(meta =>
        meta.replace("process.env.AUTHOR", packageJson.author.name),
      ),
    ],
    output: {
      format: "iife",
      file: `dist/${name}.user.js`,
      indent: false,
    },
  })),
)
