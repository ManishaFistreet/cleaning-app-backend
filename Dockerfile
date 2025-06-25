FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-cache  # Clean install with fresh cache
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]