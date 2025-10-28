FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app

# Install build dependencies needed for sqlite3
RUN apk add --no-cache python3 make g++ py3-setuptools

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci
RUN find /app/node_modules/ ! -user root -print0 | xargs -0 -r chown root:root
RUN mv node_modules ../

COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
