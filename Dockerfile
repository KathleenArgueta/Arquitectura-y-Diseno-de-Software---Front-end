# Etapa 1: Construir el proyecto con Vite
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx (El estándar de la industria)
FROM nginx:alpine
# Copiamos la build de React a la carpeta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos la configuración para que el React Router funcione
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]