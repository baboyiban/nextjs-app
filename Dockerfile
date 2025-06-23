# 1. Build 단계
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# 2. Production 런타임 단계
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV API_URL=$API_URL
ENV BASE_URL=$BASE_URL
ENV JWT_SECRET=$JWT_SECRET

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $PORT

CMD ["npm", "run", "start"]
