# Use official Node image with build tools
FROM node:18-bullseye

# 1. Install essential build tools
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 2. Set working directory
WORKDIR /app

# 3. Copy package files FIRST for layer caching
COPY package*.json ./

# 4. Clean install with verbose logging
RUN npm ci --no-cache --loglevel verbose

# 5. Copy all other files
COPY . .

# 6. Set production environment
ENV NODE_ENV=production

# 7. Expose port and run
EXPOSE 5000
CMD ["node", "server.js"]