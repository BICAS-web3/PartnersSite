# FROM node:19-alpine AS deps
# RUN #apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN #yarn install --frozen-lockfile

FROM node:19-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT 5000

CMD ["npm", "run", "dev"]