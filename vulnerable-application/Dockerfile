FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm i -g npm@9.1.1 && \
    npm i --production --silent && \
    find /app/node_modules/ ! -user root | xargs chown root:root && \
    mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
