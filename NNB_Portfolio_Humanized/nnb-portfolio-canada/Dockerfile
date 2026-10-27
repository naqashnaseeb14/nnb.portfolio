FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY server.mjs ./
COPY src ./src
COPY content ./content
COPY admin ./admin
COPY public ./public
COPY app.config.ts ./

EXPOSE 3000
CMD ["node", "server.mjs"]
