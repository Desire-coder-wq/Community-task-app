FROM node:22-slim

WORKDIR /app

# Install dependencies first for better rebuild times.
COPY package*.json ./
RUN npm ci

# Copy the rest of the backend source.
COPY . .

# Generate Prisma client (doesn't require a live DB, only schema/code).
RUN npx prisma generate

# Build the NestJS app.
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]

