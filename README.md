# sokusai-salon - エステサロン即日公開サイト（社内用）

Next.js 14 + App Router + TypeScript + Tailwind CSS を使用した、エステサロン向けの即日公開可能なWebサイトテンプレートです。

## 特徴

- **即日公開可能**: site.config.json を編集するだけで、すぐにサイトを公開できます
- **レスポンシブ対応**: スマートフォンからデスクトップまで、あらゆるデバイスに対応
- **SEO最適化**: メタデータとOGP設定済み
- **印刷対応**: 不要な要素は印刷時に非表示
- **アクセシビリティ対応**: セマンティックHTMLとARIA属性を使用

## ディレクトリ構成

```
sokusai-salon/
├── app/
│   ├── page.tsx          # メインページ
│   └── globals.css       # グローバルスタイル
├── src/
│   ├── types/            # TypeScript型定義
│   ├── config/           # サイト設定
│   │   └── site.config.json
│   ├── components/       # コンポーネント
│   │   ├── blocks/       # ブロックコンポーネント
│   │   └── *.tsx        # 共通コンポーネント
│   └── lib/             # ユーティリティ
├── public/
│   └── images/          # 画像ファイル
└── README.md
```

## 運用手順

### 1. サイト情報の編集

`src/config/site.config.json` を編集して、サイト情報をカスタマイズします。

#### 基本情報の設定
```json
{
  "site": {
    "name": "サロン名",
    "title": "ページタイトル",
    "description": "サイトの説明"
  }
}
```

#### ブランドカラーの設定
```json
{
  "brand": {
    "primaryColor": "#E91E63",
    "secondaryColor": "#FFC0CB"
  }
}
```

#### 連絡先情報
```json
{
  "contact": {
    "tel": "03-1234-5678",
    "email": "info@example.com",
    "address": "住所",
    "businessHours": "営業時間",
    "holidays": "定休日"
  }
}
```

### 2. 画像の差し替え

`public/images/` ディレクトリ内の画像を差し替えます。

必要な画像:
- `logo.png` - ロゴ画像
- `hero-bg.jpg` - ヒーロー背景画像
- `og-image.jpg` - OGP画像
- `service-*.jpg` - サービス画像
- `staff-*.jpg` - スタッフ画像
- `gallery-*.jpg` - ギャラリー画像

推奨サイズ:
- ロゴ: 240x80px
- ヒーロー背景: 1920x1080px
- サービス/ギャラリー: 800x600px
- スタッフ: 400x400px（正方形）

### 3. ブロックの編集

`site.config.json` の `pages.home` 配列でブロックの表示/非表示や順序を変更できます。

#### ブロックを非表示にする
```json
{
  "type": "coupon",
  "visible": false,
  "data": { ... }
}
```

#### ブロックの順序を変更
配列内の順序を変更することで、表示順を変更できます。

## 開発環境

### 必要な環境
- Node.js 18以上
- npm または yarn

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## デプロイ

### Vercel へのデプロイ（推奨）

1. [Vercel](https://vercel.com) にアカウントを作成
2. GitHubリポジトリと連携
3. 自動デプロイ設定

### その他のホスティング

静的エクスポート:
```bash
npm run build
npx next export
```

`out/` ディレクトリの内容を任意のWebサーバーにアップロード。

## ブロックタイプ一覧

- **Header**: ナビゲーションヘッダー
- **Hero**: ヒーローセクション
- **Features**: 特徴紹介
- **Services**: サービス一覧
- **Pricing**: 料金プラン
- **Staff**: スタッフ紹介
- **Gallery**: ギャラリー
- **Testimonials**: お客様の声
- **Coupon**: クーポン
- **ReservationCta**: 予約CTA
- **Access**: アクセス情報
- **FAQ**: よくある質問
- **Footer**: フッター
- **Announcement**: お知らせバナー

## カスタマイズ

### カラーテーマの変更

`site.config.json` の `brand.primaryColor` と `brand.secondaryColor` を変更。

### フォントの変更

`app/globals.css` の `font-family` を編集。

### 新しいブロックの追加

1. `src/components/blocks/` に新しいコンポーネントを作成
2. `src/types/site.ts` に型定義を追加
3. `app/page.tsx` の `BlockRenderer` に追加

## トラブルシューティング

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next node_modules
npm install
npm run build
```

### 画像が表示されない

- ファイル名が正しいか確認
- 拡張子が正しいか確認（.jpg, .png, .svg）
- パスが `/images/` で始まっているか確認

## ライセンス

社内利用のみ。外部への配布・販売は禁止。

## サポート

問題が発生した場合は、社内の開発チームまでお問い合わせください。
