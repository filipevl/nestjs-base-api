# Define a imagem base
FROM node:lts

# Cria e define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração e dependências para o contêiner
COPY package*.json ./
COPY yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o código fonte para o contêiner
COPY . .

# Expõe a porta em que a aplicação irá escutar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
