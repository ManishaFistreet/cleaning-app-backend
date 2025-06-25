FROM node:18
WORKDIR /app  # ← This is crucial

# COPY using relative paths (from build context to /app)
COPY package.json package-lock.json ./ 

RUN npm ci --no-cache

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]