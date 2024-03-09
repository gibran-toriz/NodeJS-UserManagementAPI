# Use the official Node.js 21 as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copying application's source code
COPY . .

# If necessary, rebuild native addons here
RUN npm rebuild

# Building the application
RUN npm run build


# Exposing  the port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
