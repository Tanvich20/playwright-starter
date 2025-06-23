# Use the official Node.js LTS image
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# By default, run all tests
CMD ["npx", "playwright", "test"]