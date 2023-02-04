# This is a multi-stage build. It has two stages, 'build' and 'production'.
FROM node:18.12.1 
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install; npm run build


FROM node:18.12.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 80
CMD [ "npm", "start" ]