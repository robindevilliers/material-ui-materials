module.exports = {
    settings : {
        react : {
            version : 'detect'
        }
    },
    env : {
        browser : true,
        es2021 : true
    },
    extends : [
        // 'standard-with-typescript',
        'plugin:react/recommended'
    ],
    overrides : [
        {
            env : {
                node : true
            },
            files : [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions : {
                sourceType : 'script'
            }
        }
    ],
    parser : "@typescript-eslint/parser",
    parserOptions : {
        ecmaVersion : 'latest',
        sourceType : 'module',
        project : ['./tsconfig.json'] // Specify it only for TypeScript files
    },
    plugins : [
        'react',
        "@typescript-eslint"
    ],
    rules : {
        // letting IntellJ govern indents.
        '@typescript-eslint/indent' : 'off',
        '@typescript-eslint/semi' : ['error', 'always'],
        '@typescript-eslint/space-before-function-paren' : ['error', 'never'],
        '@typescript-eslint/type-annotation-spacing' : ['off', { before : false }],
        '@typescript-eslint/key-spacing' : ['off', { beforeColon : false }],
        '@typescript-eslint/no-this-alias' : 'off',
        '@typescript-eslint/strict-boolean-expressions' : 'off',
        '@typescript-eslint/no-non-null-assertion' : 'off',
        '@typescript-eslint/explicit-function-return-type' : 'off',
        '@typescript-eslint/no-dynamic-delete' : 'off',
        '@typescript-eslint/no-empty-interface' : 'off',
        '@typescript-eslint/no-base-to-string' : 'off'
    }
};
