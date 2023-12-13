FROM node:lts-alpine 

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

# CMD [ "npm", "run", "start:prod" ]

