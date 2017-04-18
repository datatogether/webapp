FROM node:latest
ADD . /context
WORKDIR /context
RUN yarn install
RUN yarn upgrade node-sass --force

ENTRYPOINT yarn run develop