import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    // ...,
  ],
  server: {
    proxy: {
      // NAS dev 서버로 프록시한다. 배포 환경의 nginx와 동일하게 경로를
      // 그대로 넘기므로(rewrite 없음), VITE_API_BASEURL 은 로컬과 배포가
      // 모두 /api/v1 로 같다.
      "/api": {
        target: "https://dev.coblocks.net",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            // 1. 기존 응답 헤더를 가져옵니다.
            const originalHeaders = proxyRes.headers;

            // 2. CORS 관련 헤더를 추가/수정합니다.
            // 클라이언트(브라우저)의 주소를 허용해 줍니다.
            res.setHeader(
              "Access-Control-Allow-Origin",
              req.headers.origin || "*",
            );
            // 자격 증명(쿠키)을 허용하는 헤더를 추가합니다.
            res.setHeader("Access-Control-Allow-Credentials", "true");

            // 3. 쿠키 관련 로직을 강화합니다.
            if (originalHeaders["set-cookie"]) {
              const newCookies = originalHeaders["set-cookie"].map(
                (cookie: any) => {
                  return (
                    cookie
                      // Domain 속성을 localhost로 변경
                      .replace(/Domain=[^;]+;?/i, "Domain=localhost;")
                      // Secure 속성 제거 (http 환경에서도 쿠키 사용 가능하게)
                      .replace(/; Secure/i, "")
                      // SameSite 속성 제거 (개발 중 제약사항 완화)
                      .replace(/; SameSite=(Strict|Lax|None)/i, "")
                  );
                },
              );
              proxyRes.headers["set-cookie"] = newCookies;
            }
          });
        },
      },
    },
  },
});
