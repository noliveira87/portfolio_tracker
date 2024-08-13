# Usar a imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e instalar as dependências
COPY package.json ./
RUN npm install

# Copiar o restante do código para o contêiner
COPY . .

# Expor a porta onde o servidor vai correr
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "index.js"]
