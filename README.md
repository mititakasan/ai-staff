# ai-staff

AIスタッフ紹介のランディングページ（静的サイト / GitHub Pages、`CNAME` で独自ドメイン配信）。

## 構成

```
index.html        エントリーポイント
css/lp.css        全スタイル（後半はセクションごとの上書き）
js/lp.js          全スクリプト（各ブロックは独立した即時関数）
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

- lp.css / lp.js 内のブロック順に依存しています。順序を入れ替えないでください。
- キャッシュ対策として `?v=` クエリを使っています。ファイルを更新したら番号を上げてください。
