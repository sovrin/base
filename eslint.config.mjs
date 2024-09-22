import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin, { configs } from 'eslint-plugin-import';
import tseslint, { config } from 'typescript-eslint';

export default config({
    plugins: {
        import: fixupPluginRules(importPlugin),
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: '<root>/tsconfig.json',
            },
        },
    },
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.stylistic,
    ],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
        parserOptions: {
            project: true,
        },
    },
    rules: {
        ...prettier.rules,
        ...configs.recommended.rules,
        ...configs.typescript.rules,
        quotes: ['error', 'single'],
        'import/exports-last': ['error'],
        'import/group-exports': ['error'],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
});
