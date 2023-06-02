# pull base image
FROM node:16.19.0

# Install project dependencies
COPY package*.json ./
RUN npm install

# Install Firebase tools globally
RUN npm install -g firebase-tools

# Copy the server code to the container
COPY . .

# Expose the port your server is listening on (replace 3000 with your actual port)
EXPOSE 5001

# Command to start the server
CMD ["npm", "run", "serve"]