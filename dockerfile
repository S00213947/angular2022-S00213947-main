# Use a compatible Node.js base image with Node.js v18
FROM node:18-alpine as build
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy project files
COPY . .

# Build the Angular application and log errors
RUN ng build --configuration production || (ls /tmp/ng-* && cat /tmp/ng-*/angular-errors.log && false)

FROM nginx:alpine
COPY --from=build /app/dist/client-app2022 /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


