# Usa una imagen base de Node.js
FROM node:18.17.1

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
