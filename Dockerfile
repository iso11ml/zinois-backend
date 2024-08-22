# Usa una imagen base de Node.js
FROM node:18.17.1

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:7p%28x%3FN%23%24KYTps@34.44.103.222:5432/zinois"
ENV API_KEY="jlw0dT7PsI7E5VcXLFwix+TEMsxX+S8m3rDl+1Re+1+b9pt8+EX3uONNkWJSkQ/56RYE2xJbWDHS4kMp9j4WnA=="

# Crea y configura el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Genera el cliente Prisma
RUN npx prisma generate

# Construye el proyecto
RUN npm run build

# Expón el puerto en el que la aplicación escuchará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
