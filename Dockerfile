FROM node:18-bullseye

# 1. Install essential build tools (for bcryptjs and other potential native modules)
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 2. Set work directory
WORKDIR /app

# 3. First copy ONLY package files
COPY package.json package-lock.json ./

# 4. Verify files were copied correctly (debugging step)
RUN ls -la && cat package.json

# 5. Clean install with network retries
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci --no-cache --loglevel verbose

# 6. Copy remaining files
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]