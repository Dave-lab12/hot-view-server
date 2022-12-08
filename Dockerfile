FROM node:18.12.1-alpine3.16
WORKDIR /usr/src/app
COPY package.json yarn* /usr/src/app/

COPY prisma  ./prisma/
COPY tsconfig.json ./


# COPY ./docker-entrypoint.sh /docker-entrypoint.sh
# RUN chmod +x /docker-entrypoint.sh
# ENTRYPOINT ["/docker-entrypoint.sh"]

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD [ "yarn","dev" ]
