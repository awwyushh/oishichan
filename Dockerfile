FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

ENV NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"

CMD ["npm", "run", "dev"]