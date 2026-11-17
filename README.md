# ai-staff

AIスタッフ紹介のランディングページ（静的サイト / GitHub Pages、`CNAME` で独自ドメイン配信）。

## 構成

```
index.html        エントリーポイント
css/              スタイル（lp.css がベース、他は後から重ねる上書き）
js/               スクリプト（lp.js がベース、他は index.html 末尾の順で読み込み）
assets/lp/        ページで使う画像
assets/reference/ キャラクター画像
CNAME             独自ドメイン設定
```

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 を開く。

## 注意

- CSS/JS は読み込み順に依存しています。`index.html` の順序を変えないでください。
- キャッシュ対策として `?v=` クエリを使っています。ファイルを更新したら番号を上げてください。
