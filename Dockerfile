FROM node:20-bookworm AS builder
WORKDIR /app

# 1. 필수 시스템 종속성 설치 및 npm 캐시 정리
RUN apt-get update && apt-get install -y --no-install-recommends git python3 make g++ \
    && rm -rf /var/lib/apt/lists/* \
    && npm cache clean --force

# 2. 의존성 설치 (패키지 파일 복사 및 npm ci)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps || \
    (echo "npm ci failed, retrying with npm install..." && npm install --legacy-peer-deps)

# 3. 소스 코드 복사
COPY . .

# 4. 빌드 실행
#    Next.js 빌드 실패 시, lockfile 패치 문제일 수 있으므로 npm install 후 재시도
RUN npm run build || (echo "Build failed, running npm install and retrying build..." && npm install --legacy-peer-deps && npm run build)

# 5. 프로덕션 런타임 이미지
FROM node:20-bookworm AS runner
WORKDIR /app

# 빌드 결과물 및 프로덕션에 필요한 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
# next.config.js가 있다면 복사
# COPY --from=builder /app/next.config.js .

# 프로덕션 의존성만 설치 (--omit=dev 사용)
RUN npm ci --omit=dev --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "run", "start"]
