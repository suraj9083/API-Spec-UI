# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install --force

# Copy the rest of the application code into the container
COPY . .

# Build the Angular application (replace "build" with the actual build command)
RUN npm run build

# Expose the port that the application will run on
EXPOSE 4200

# Start the application
CMD [ "npm", "start" ]
