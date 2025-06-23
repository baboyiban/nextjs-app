# 1. Build 단계
FROM oven/bun:1.1.13-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# 2. Production 런타임 단계
FROM oven/bun:1.1.13-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $FRONTEND_PORT

CMD ["bun", "run", "start"]
