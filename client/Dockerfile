FROM node:20
ARG VITE_APP_SERVER_URL
ENV VITE_APP_SERVER_URL=$VITE_APP_SERVER_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.19.0-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf