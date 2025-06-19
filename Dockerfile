# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies (if any)
RUN npm install --omit=dev --no-audit --no-fund || true

# Copy the application code
COPY index.js ./

# Create logs directory
RUN mkdir -p /app/logs

# Set environment variable for log path
ENV LOG_PATH=/app/logs/app.log

# Set the default command
CMD ["node", "index.js"] 