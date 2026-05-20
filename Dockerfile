FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set production mode
ENV NODE_ENV=production

# Expose app port
EXPOSE 10000

# Start application
CMD ["node", "app.js"]