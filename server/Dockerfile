FROM 'zencitycontainers.azurecr.io/zc-puppeteer-node8-linux'


COPY package*.json ./
COPY build ./

RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8030
EXPOSE 8030

CMD [ "node", "build/main.js" ]

