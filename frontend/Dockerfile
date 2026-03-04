# Usa uma imagem do Node para rodar o Angular
FROM node:20

WORKDIR /app

# Instala o Angular CLI dentro do container
RUN npm install -g @angular/cli

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando para iniciar o servidor do Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]