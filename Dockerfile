# Imagem base Node.js
FROM node:20-alpine as build

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json yarn.lock* ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar código fonte
COPY . .

# Compilar a aplicação
RUN yarn build

# Imagem para servir o conteúdo estático
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Instalar serve para servir conteúdo estático
RUN yarn global add serve

# Copiar build da aplicação
COPY --from=build /app/dist /app

# Expor porta para o Traefik
EXPOSE 3000

# Iniciar serve
CMD ["serve", "-s", ".", "-l", "3000"]