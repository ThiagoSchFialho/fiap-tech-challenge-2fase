FROM node:20

WORKDIR /fiap-tech-challenge-2fase

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run", "start:dev"]
