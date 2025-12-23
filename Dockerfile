# =========================
# 1️⃣ Builder Stage
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build


# =========================
# 2️⃣ Runtime Stage
# =========================
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose app port
EXPOSE 5000

# Start application
CMD ["node", "dist/index.js"]
