FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node

RUN npm run build

EXPOSE 2000

CMD ["npm", "run", "start"]
