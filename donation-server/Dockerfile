# pull base image
FROM node:16.19.0

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy the server code to the container
COPY . .

# Expose the port your server is listening on (replace 3000 with your actual port)
EXPOSE 8080

# Command to start the server
CMD ["npm", "start"]