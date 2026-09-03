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
