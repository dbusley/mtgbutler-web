FROM node:13

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
