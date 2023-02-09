FROM node:18 AS frontend-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && yarn install && npm run build

FROM node:18 AS server-build
WORKDIR /root/
COPY --from=frontend-build /usr/src/app/frontend/build ./frontend/build
COPY backend/ ./backend/
RUN cd backend && npm install

EXPOSE 8080

WORKDIR /root/backend/
CMD ["node", "app.js"]