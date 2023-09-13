import typescript from "@rollup/plugin-typescript";
// import typescript from 'rollup-plugin-typescript2';
import resolve from "@rollup/plugin-node-resolve";
import {readFileSync} from "fs";
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8")); // 读取UMD全局模块名，在package中定义了
const pkgName = packageJson.moduleName;
export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/esm/index.js",
            format: "esm",
        },
        {
            file: "dist/cjs/index.cjs",
            format: "cjs",
        },
        {
            file: "dist/bundle/index.min.js",
            format: "iife",
            name: pkgName,
            plugins: [terser()],
        },
    ],
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json",
        }),
        alias({
            resolve: [".js"],
        }),
        resolve(),
    ],
};