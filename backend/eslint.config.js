import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        files: ["src/**/*.ts"],
        rules: {
            // -- Code quality --
            "no-console": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "eqeqeq": "error",
            "curly": "error",
            "no-throw-literal": "error",
        },
    },
    {
        ignores: ["node_modules/", "dist/"],
    }
);
