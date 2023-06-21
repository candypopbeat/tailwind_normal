# Tailwindをテストするためのベースコード
<br>

## 専用フォルダ（ディレクトリ）を作ってプロジェクトとする
```bash!
# ディレクトリ作成
mkdir tailwind_test

# プロジェクトとし、中に入る
cd tailwind_test
```
<br>

## テスト用 index.html を作る
```html!
<!DOCTYPE html>
<html lang="ja" data-theme="valentine">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- dist.css に Tailwind も入っている -->
  <link rel="stylesheet" href="dist.css">

  <title>Tailwind CSS Test</title>
</head>

<body>

  <!-- コンテナ -->
  <div class="container mx-auto mb-10 pt-10">
  
    <!-- 見出し -->
    <h1 class="text-base sp:text-lg tb:text-2xl pc:text-4xl mb-10">Tailwind CSS Test</h1>

    <!-- ボタン -->
    <button class="btn">Button</button>
    <button class="btn btn-neutral">Neutral</button>
    <button class="btn btn-primary">Button</button>
    <button class="btn btn-secondary">Button</button>
    <button class="btn btn-accent">Button</button>
    <button class="btn btn-ghost">Button</button>
    <button class="btn btn-link">Button</button>
    
    <!-- 水平線 -->
    <div class="divider">Divider</div>

    <!-- モーダル -->
    <button class="btn btn-secondary" onclick="my_modal_1.showModal()">open modal</button>
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>

  </div>

  <!-- コンテナ -->
  <div class="container mx-auto">

    <!-- フォントサイズ -->
    <p class="text-sm ...">The quick brown fox ...</p>
    <p class="text-base ...">The quick brown fox ...</p>
    <p class="text-lg ...">The quick brown fox ...</p>
    <p class="text-xl ...">The quick brown fox ...</p>
    <p class="text-2xl ...">The quick brown fox ...</p>

  </div>

  <!-- フッター -->
  <footer class="mt-10">
    &copy; Tailwind Test.
  </footer>
  
</body>

</html>
```
<br>

## Tailwind 用の CSS ファイルとして input.css を作る
```css
/* Tailwind用 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 下記はオリジナル */

/* フッターを最下部固定にするために */
html, body {
  height: 100%;
}

footer {
  position: sticky; /* フッターを最下部固定にするために */
  top: 100%; /* フッターを最下部固定にするために */
  background-color: skyblue;
  font-size: 1.3rem;
  color: white;
  padding: 1rem 0;
  text-align: center;
}
```
<br>

## コンパイル出力用の dist.css を作る
```bash
touch dist.css
```
<br>

## Tailwind と autoprefixer をインストールする
- Tailwindは、CSSフレームワーク
- autoprefixerは、自動でベンダープレフィックスをつけるプラグイン
```bash
# インストール
npm install -D tailwindcss postcss autoprefixer

# tailwind.config.js を生成する
npx tailwindcss init
```
<br>

## Bootstrap っぽくなる daisyUI をインストールする
```bash
npm i -D daisyui
```
<br>

## tailwind.config.js をテスト用に編集する
```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 監視対象
  content: [
    "./index.html"
  ],
  // ミニファイ対象
  purge: [
    "./index.html"
  ],
  theme: {
    // デフォルト値の継承と上書き
    extend: {
      // ブレークポイントのデフォルト値
      // screens: {
      //   sm:	"640px",
      //   md:	"768px",
      //   lg:	"1024px",
      //   xl:	"1280px",
      //   '2xl': "1536px"
      // }
    },
    // 新規ブレークポイント、デフォルトは効かなくなる
    screens: {
      sp: "400px",
      tb: "768px",
      pc: "1280px",
    },
  },
  plugins: [
    // テーマのdaisyUI読込
    require("daisyui"),
    function({addComponents}) {
      addComponents({
        // コンテナサイズのデフォルト値
        // ".container": {
        //   maxWidth: "100%",
        //   "@screen sm": {
        //     maxWidth: "640px",
        //   },
        //   "@screen md": {
        //     maxWidth: "768px",
        //   },
        //   "@screen lg": {
        //     maxWidth: "1024px",
        //   },
        //   "@screen xl": {
        //     maxWidth: "1280px",
        //   },
        //   "@screen 2xl": {
        //     maxWidth: "1536px",
        //   },
        // }

        // 新規コンテナサイズ
        ".container": {
          maxWidth: "95%",
          "@screen sp": {
            maxWidth: "80%",
          },
          "@screen tb": {
            maxWidth: "768px",
          },
          "@screen pc": {
            maxWidth: "1200px"
          }
        }
      })
    },
  ],
  daisyui: {
    // 使用テーマ
    themes: ["light", "dark", "cupcake", "retro", "valentine"],
    // ユーザー環境がダークモードのときのテーマ指定
    darkTheme: "retro",
  },
}
```
<br>

## プラグイン設定ファイルの post.config.js を作る

1. post.config.js を生成する
    ```bash
    npx tailwindcss init -p
    ```
1. post.config.js を編集する
    ```bash
    module.exports = (ctx) => ({
      map: ctx.options.map,
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    });
    ```
<br>

## package.json にスクリプトを追加する
```diff
{
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "cssnano": "^6.0.1",
    "daisyui": "^3.1.5",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2"
+  },
+  "scripts": {
+    "dev": "tailwindcss -i input.css -o dist.css --watch",
+    "build": "tailwindcss -i input.css -o dist.css --minify"
+  }
}

```
<br>

## テストを開始する
1. リアルタイムコンパイルを実行する
    ```bash
    npm run dev
    ```
1. ビルドしてCSSミニファイをしながら確立させてもよい
    ```bash
    npm run build
    ```
