
FROM node:18

WORKDIR /app

COPY --from = builder /app/node_modules ./node_modules
COPY --from = builder /app/dist ./dist
COPY --from = builder /app/env ./env
COPY package*.json ./

RUN npm run build
RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]