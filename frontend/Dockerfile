FROM node:20-alpine

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:5000

EXPOSE 3000
CMD ["npm", "start"]