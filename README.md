# サロン（ネイル＆ケアサロン）公式ホームページ

ビルド不要の静的サイト（HTML / CSS / JavaScript）。GitHub Pages で無料公開できます。

## 見た目の確認（ローカル）

```
python3 -m http.server 8000
# → http://localhost:8000
```

## よく触る場所

| やりたいこと | 編集するファイル |
|---|---|
| LINE / Instagram のURLを入れる | `js/config.js` |
| ギャラリーに写真を追加 | 写真を `assets/images/` に置き、`js/config.js` の `GALLERY` に1行追加 |
| 文言・料金・営業時間 | `index.html` |
| 色・フォント | `css/style.css` の先頭 `:root` |

## 公開手順（GitHub Pages）

1. このリポジトリを GitHub に push し、`main` にマージ
2. GitHub の **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にする
3. `.github/workflows/pages.yml` が動き、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開される

## 本公開するとき

- `index.html` の `<meta name="robots" content="noindex">` を削除（検索に載せる）
- 独自ドメイン取得 → リポジトリ直下に `CNAME` ファイル（中身はドメイン名のみ）を置き、Settings → Pages で設定、HTTPS を有効化
- 仮の文言（`サロン名（仮）`、料金「確認中」）を正式なものに差し替え

## 方針

- サーバー側プログラム・DBなし。予約はLINEへ誘導し、サイトで個人情報は集めない
- 自宅サロンのため住所は非公開（予約確定後に案内）
