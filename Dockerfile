# ========================================
# Build Stage
# ========================================
FROM node:22-alpine AS build

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

# 의존성 파일 복사 (레이어 캐싱 최적화)
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 빌드 타임 환경변수 (Vite는 빌드 시점에 값을 번들에 인라인함)
# VITE_API_BASEURL: 상대경로라 도메인·포트에 의존하지 않는다.
# 백엔드 매핑이 /api/v1/** 이고 nginx가 경로를 그대로 넘기므로 이 값을 쓴다.
# 덕분에 같은 이미지를 dev / prod 에 그대로 배포할 수 있다.
ARG VITE_API_BASEURL=/api/v1
ARG VITE_AUTHORIZATION_URL=
ARG VITE_CLIENT_ID=
ENV VITE_API_BASEURL=$VITE_API_BASEURL \
    VITE_AUTHORIZATION_URL=$VITE_AUTHORIZATION_URL \
    VITE_CLIENT_ID=$VITE_CLIENT_ID

# 프로덕션 빌드
RUN pnpm run build

# ========================================
# Runtime Stage
# ========================================
FROM nginx:1.27-alpine

# Nginx 설정 파일 복사
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 헬스체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
