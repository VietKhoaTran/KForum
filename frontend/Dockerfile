FROM node:20

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:5000

EXPOSE 3000

CMD ["npm", "start"]