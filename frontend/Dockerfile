FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV REACT_APP_BACKEND_URL=http://54.206.119.98:5000

EXPOSE 3000
CMD ["npm", "start"]
