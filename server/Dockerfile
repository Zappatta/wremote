FROM 'node:8.11.1-alpine'

RUN mkdir /var/app/
WORKDIR /var/app/

COPY package*.json /var/app/
COPY build /var/app/

RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8030
EXPOSE 8030

CMD [ "node", "build/main.js" ]

