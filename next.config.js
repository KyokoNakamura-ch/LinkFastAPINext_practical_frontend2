require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // .env ファイルに定義した環境変数をビルド時に利用可能にする
        NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    },
    output: "standalone", // ✅ 本番環境での Next.js 実行に対応
};

module.exports = nextConfig;

