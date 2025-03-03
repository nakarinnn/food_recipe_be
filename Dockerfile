# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install ts-node globally if you are using ts-node
RUN npm install -g ts-node

# Build the TypeScript code (only if using TypeScript compilation)
# If you are using ts-node to run directly, skip the next line
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run your application
CMD ["npm", "run", "start"]
