# The builder from node image
FROM nginx:1.11-alpine

COPY /dist/robiot-app/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
