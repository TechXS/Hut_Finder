FROM node:21-alpine3.18 as builder
WORKDIR /app
RUN addgroup app && adduser -S -G app app && chown -R app /app
USER app

COPY --chown=app:app package*.json ./

RUN npm install
COPY --chown=app:app . ./

RUN npm run build --if-present

EXPOSE 5000

CMD ["npm","run","start"]
