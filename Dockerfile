# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

ARG REACT_APP_API_BASE_URL=/server/api

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the built static files to Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx config to handle client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
