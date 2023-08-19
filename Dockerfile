# Use the official Node.js image as the base image
FROM node:14 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY .

# Build the Angular application
RUN npm run build

# Use a lightweight Node.js image to serve the application
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage to this stage
COPY --from=builder /app/dist ./dist

# Expose the port on which the application will run (Angular's default is 4200)
EXPOSE 4200

# Command to start the application
CMD ["node", "./dist/main.js"]
