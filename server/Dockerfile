FROM 'zencitycontainers.azurecr.io/zc-puppeteer-node8-linux'


COPY package*.json ./

RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8030
EXPOSE 8030

CMD [ "npm", "run build" ]
CMD [ "node", "public/main.js" ]

