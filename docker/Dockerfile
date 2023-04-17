# build environment
FROM node:18-alpine AS builder
LABEL MAINTAINER="Kciope <tech@kciope.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install & build the app
COPY . /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --frozen-lockfile --no-cache --production
RUN yarn build
RUN yarn cache clean

# run environment
FROM node:18-alpine
LABEL MAINTAINER="Kciope <tech@kciope.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/db/config
RUN mkdir -p /usr/src/app/db/migrations
RUN mkdir -p /usr/src/app/db/seeders
RUN mkdir -p /usr/src/app/db/seeders/staging
RUN mkdir -p /usr/src/app/db/seeders/production

COPY --from=builder /usr/src/app/dist/src /usr/src/app/src
COPY --from=builder /usr/src/app/dist/node_modules /usr/src/app/node_modules
COPY package.json /usr/src/app
COPY .sequelizerc /usr/src/app/.sequelizerc
COPY db/config /usr/src/app/db/config
COPY db/migrations /usr/src/app/db/migrations
COPY db/seeders /usr/src/app/db/seeders
COPY wait-for-it.sh /usr/src/app

RUN chmod +x /usr/src/app/wait-for-it.sh

CMD [ "yarn", "start" ]
