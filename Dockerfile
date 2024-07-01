# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Set environment variables
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ENV AIRTABLE_ACCESS_TOKEN=${AIRTABLE_ACCESS_TOKEN}
ENV BASE_ID=${BASE_ID}
ENV BOT_TOKEN=${BOT_TOKEN}
ENV BASE_NAME=${BASE_NAME}

# Run the initialization script
RUN npm i

# Define the command to run the application
CMD ["npm", "start"]