# Use a compatible Node.js base image
FROM node:14-alpine as build
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
RUN npm run build --prod || (ls /tmp/ng-* && cat /tmp/ng-*/angular-errors.log && false)

FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]