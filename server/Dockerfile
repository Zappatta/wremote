FROM 'node:8.11.1-alpine'


COPY package*.json ./
COPY build ./

RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8030
EXPOSE 8030

CMD [ "node", "build/main.js" ]

