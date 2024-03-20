FROM node:21-alpine3.18 as builder
WORKDIR /app
RUN addgroup app && adduser -S -G app app && chown -R app /app
USER app

COPY --chown=app:app package*.json .

RUN npm -v
RUN npm install
COPY --chown=app:app . .
ARG BACKEND_API_URL
ENV VITE_BACKEND_API_URL=${BACKEND_API_URL}
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]