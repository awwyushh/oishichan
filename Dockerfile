# Use official Node.js image (Debian-based, not Alpine)
FROM node:23

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the entire project
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Set environment variables (if needed)
ENV NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"

# Use --turbo flag to disable Turbopack (if needed)
CMD ["npm", "run", "dev"]
