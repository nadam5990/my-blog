import type { NextConfig } from "next";

// GitHub Pages 배포 시 GITHUB_PAGES=true 환경변수가 설정됨
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // GitHub Pages는 정적 파일만 지원
  output: isGitHubPages ? "export" : undefined,

  // 저장소 이름이 my-blog이므로 URL이 /my-blog/... 형태
  basePath: isGitHubPages ? "/my-blog" : "",

  // 정적 내보내기 시 Next.js 이미지 최적화 비활성화
  images: {
    unoptimized: isGitHubPages,
  },

  // GitHub Pages에서 /blog/ 형태로 접근하도록
  trailingSlash: isGitHubPages,
};

export default nextConfig;
