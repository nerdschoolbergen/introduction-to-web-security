FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm i --production --silent
RUN find /app/node_modules/ ! -user root -print0 | xargs -0 -r chown root:root
RUN mv node_modules ../

COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
