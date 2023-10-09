# Stage 1: Build the Angular application
FROM node:16 as build
WORKDIR /usr/local/app

RUN npm cache clean --force

COPY ./ /usr/local/app/
RUN npm install
RUN npm run build --prod

# Stage 2: Serve the app with nginx
FROM nginx:latest

# Copy the built files to replace the default nginx contents
COPY --from=build /usr/local/app/docs /usr/share/nginx/html

# Copy the index.html to 404.html
COPY --from=build /usr/local/app/docs/index.html /usr/share/nginx/html/404.html

# Copy the custom nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80