# Stage 1: Build
FROM node:20-alpine AS build
# Directorio donde se mantendran los archivos de la app
WORKDIR /usr/src/app
# Copiar el package.json y el package-lock en nuestro WORKDIR
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar todos los archivos
COPY . .
# Construir la aplicacion lista para produccion, puede no incluir el # flag --prod
RUN npm run build --prod
# Stage 2: ExposeApp
FROM nginx:1.21-alpine
# Copiar desde la "Etapa" build el contenido de la carpeta build/
# dentro del directorio indicado en nginx
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
# Copiar desde la "Etapa" build el contenido de la carpeta la 
# configuracion de nginx dentro del directorio indicado en nginx
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto que deseemos
EXPOSE 80