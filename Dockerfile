FROM node:18.15 as dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY package.json yarn.lock ./
RUN pnpm install

FROM node:18.15 as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build:production

FROM node:18.15 as runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
