# Use Node.js LTS version
FROM node:22.11.0-slim

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
