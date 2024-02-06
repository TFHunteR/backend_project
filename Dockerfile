# syntax=docker/dockerfile:1

FROM node:16-alpine
WORKDIR /app
COPY . .

# RUN apk add --no-cache git openssh
RUN yarn global add sequelize-cli
RUN yarn install

CMD ["node", "index.js"]