FROM node:alpine

# Cria diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de dependência primeiro (melhora o cache do Docker)
COPY iot-devices-api/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY iot-devices-api/ ./

# Gera o Prisma Client
RUN npx prisma generate

# Aplica as migrations (em ambiente de produção)
RUN npx prisma migrate deploy

# Transpila o código TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
