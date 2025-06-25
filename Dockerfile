FROM node:18
WORKDIR /app

ARG REPO_URL
ARG BRANCH=main
RUN git clone -b ${BRANCH} ${REPO_URL} . && \
    npm install

EXPOSE 5000
CMD ["node", "server.js"]