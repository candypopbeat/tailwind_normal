/** @type {import('tailwindcss').Config} */
module.exports = {
  // 監視対象
  content: [
    "*.html"
  ],
  // ミニファイ対象
  purge: [
    "*.html"
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
    container: {
      center: true,
    }
  },
  plugins: [
    // テーマのdaisyUI読込
    require("daisyui"),
  ],
  daisyui: {
    // 使用テーマ
    themes: ["light", "dark", "cupcake", "retro", "valentine"],
    // ユーザー環境がダークモードのときのテーマ指定
    darkTheme: "retro",
  },
}