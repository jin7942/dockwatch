# 빌드
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build 

# 실행
FROM node:20-alpine

WORKDIR /app

# 빌드 결과물과 node_modules만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
EXPOSE 3738

CMD ["node", "dist/index.js"]
