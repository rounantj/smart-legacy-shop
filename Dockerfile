# Use the official Node.js 14 image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN apt-get update && npm install --unsafe-perm --force

# Copy the rest of the project files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Set the command to start the app
CMD ["npm","run", "start"]