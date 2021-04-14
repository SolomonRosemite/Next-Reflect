FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy required files
COPY package.json tsconfig.json .env ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

# Start Node server
CMD [ "npm", "start" ]
