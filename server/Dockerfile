FROM 'node:8.11.1-alpine'

RUN mkdir /var/app/
WORKDIR /var/app/

COPY package*.json /var/app/
RUN mkdir /var/app/build/
COPY build /var/app/build/

RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8030
EXPOSE 8030

CMD [ "node", "build/main.js" ]

