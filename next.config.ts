import type { NextConfig } from "next";

// 判斷是否在 GitHub Actions 或手動指定 GitHub Pages 部署環境
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isProd = process.env.NODE_ENV === 'production';

// 若在 GitHub Actions 部署或有指定 BASE_PATH，預設使用倉庫名稱 /seven-seater-guide
const repoName = 'seven-seater-guide';
const basePath = process.env.BASE_PATH ?? (isGitHubActions || isProd ? `/${repoName}` : '');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath ? basePath : undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
  },
};

export default nextConfig;
