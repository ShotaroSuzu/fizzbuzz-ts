# fizzbuzz-ts

## [メモ] このプロジェクトの作成方法
### 事前準備
`asdf` のインストール

```
brew install asdf
```

nodeの最新バージョンをasdfに登録

```
asdf install node
```

このプロジェクトのnodeのバージョンを指定(以下のコマンドは `16.13.2` の場合)

```
asdf local nodejs 16.13.2
```

### typescript開発環境構築
[typescript × Nodejs の開発環境構築](https://github.com/TypeStrong/ts-node#installation) の以下のコマンドを実行

```
# Locally in your project.
npm install -D typescript
npm install -D ts-node

# Depending on configuration, you may also need these
npm install -D tslib @types/node
```

Typescriptの設定ファイル作成

```
npx tsc --init
```

Prettier(フォーマッタ)の設定
```
 npm install --save-dev prettier
```

`.editorconfig` (フォーマットの設定ファイル) の作成
```
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

```

`.prettierrc` (Prittierそのものの設定ファイル)を作成
```
{
    "trailingComma": "es5",
    "semi": true,
    "singleQuote": true
}
```

VSCodeの設定

`.vscode`のフォルダを作り、`extensions.json` ファイルを作成し、以下を追記

```
{
    "recommendations": [
        "esbenp.prettier-vscode",
        "streetsidesoftware.code-spell-checker",
    ],
    "unwantedRecommendations": []
  }
```
`.vscode`のフォルダ以下に、`settings.json` ファイルを作成し、以下を追記
```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

ESLintの設定

```
npx eslint --init
```
コマンドを実行したら、対話形式で以下を設定
- yes
- `How would you like to use ESLint?` : `To check syntax and find problems`
- `What type of modules does your project use?` : `import / export`
- `Which framework does your project use?` : ` None of these`
- `Does your project use TypeScript?` : `Yes`
- `Where does your code run?` : `Node`
- `What format do you want your config file to be in?` : `JavaScript`
- `Would you like to install them now with npm?` : `Yes`

ESLintの設定にPrettierとの連携ツールを追加
```
 npm install --save-dev eslint-config-prettier
```
`.eslintrc.js` の `extends` に `prettier` を追加


コマンドラインで実行できるようにする。

`package.json` の `scripts` を以下のようにする。
```
"scripts": {
    "fix:prettier": "prettier --write src",
    "lint:prettier": "prettier --check src",
    "fix": "run-s fix:prettier fix:eslint",
    "fix:eslint": "eslint src --ext .ts --fix",
    "lint": "run-p lint:prettier lint:eslint",
    "lint:eslint": "eslint src --ext .ts"
},
```
コードの修正を並列にできるようにする.

```
npm install --save-dev npm-run-all
```

VSCodeのプラグイン設定に(`.vscode/extensions.json`)もESLintの設定を追加
```
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "dbaeumer.vscode-eslint"
        ],
  "unwantedRecommendations": []
```

Jestを使えるようにする

Jestのインストール
```
npm install jest @types/jest ts-jest --save-dev
```

Jestの設定。以下を実行するといろいろ聞かれる。
```
npx jest --init
```

以下のように回答を入力する。設定にpackage.jsonとjest.config.tsが編集される。
- `Would you like to use Jest when running "test" script in "package.json"?` : `Y`
- `Would you like to use Typescript for the configuration file?` : `Y`
- `Choose the test environment that will be used for testing` : `node`
- `Do you want Jest to add coverage reports?` : `y`
- `Which provider should be used to instrument code for coverage?` : `v8`
- `Automatically clear mock calls, instances and results before every test?` : `y`

testの対象を指定するために、`jest.config.js` に以下の設定を追加.
```
transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ]
```

jest系のものがESLintで引っかからないように `.eslintrc.js` を修正
```
{
  env: {
    :
    'jest/globals': true,
  }
  extends: [
    :
    'plugin:jest/recommended'
    :
  ],
  plugins: [
    "jest"
    :
  ]
}
```

プロジェクトファイル内の参照方法を `@/` でできるようにする。

`tsconfig.json` に以下の設定を追加
```
"compilerOptions": {
"baseUrl": ".",
"paths": {
    "@/src/*": ["src/*"]
}
}
```

`jest.config.js` に以下の設定を追加
```
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
```
