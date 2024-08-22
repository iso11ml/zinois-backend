# Usa una imagen base de Node.js
FROM node:18.17.1

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:7p%28x%3FN%23%24KYTps@34.44.103.222:5432/zinois"
ENV JWT_SECRET="jlw0dT7PsI7E5VcXLFwix+TEMsxX+S8m3rDl+1Re+1+b9pt8+EX3uONNkWJSkQ/56RYE2xJbWDHS4kMp9j4WnA=="

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
