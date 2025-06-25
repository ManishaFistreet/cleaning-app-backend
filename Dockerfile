# Use official Node image with build tools
FROM node:18-bullseye

# 1. Install essential build tools
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 2. Set working directory (critical!)
WORKDIR /usr/src/app

# 3. Copy package files FIRST
COPY package*.json ./

# 4. Verify files exist (debugging)
RUN ls -la && \
    echo "Node version: $(node -v)" && \
    echo "NPM version: $(npm -v)"

# 5. Install dependencies with clean cache
RUN npm ci --no-cache --loglevel verbose

# 6. Copy ALL other files
COPY . .

# 7. Environment setup
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]