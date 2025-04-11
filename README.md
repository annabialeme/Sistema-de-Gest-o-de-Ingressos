 Criando uma API Node.js para Gerenciar Usuários
 Passo 1: Configurar o Ambiente
1️⃣ Instalar o Node.js
Caso ainda não tenha instalado, baixe e instale o Node.js pelo site oficial: Node.js Após a instalação, verifique se está correto com os comandos:
node -v
npm -v
2️⃣ Criar a Pasta do Projeto e Inicializar o Node.js
Crie a pasta do projeto e execute:
npm init -y
Isso criará um arquivo package.json, responsável por gerenciar as dependências do projeto.
3️⃣ Instalar Dependências
Agora, instale as bibliotecas necessárias:
npm install express cors dotenv uuid
Explicação das dependências:
express → Framework para criar o servidor web
cors → Permite que a API seja acessada por outros domínios
dotenv → Gerencia variáveis de ambiente
uuid → Gerencia os id.
Para reiniciar o servidor automaticamente ao salvar alterações, instale o Nodemon:
npm install nodemon --save-dev
4️⃣ Configurar os Scripts no package.json
Edite package.json e adicione dentro de "scripts":
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Agora quando quisermos podemos iniciar o servidor com:
npm run dev

Passo 2: Criar o Arquivo .env
Crie um arquivo .env na raiz do projeto e adicione:
PORT=3000
Passo 3: Criar o Arquivo .gitignore
No arquivo .gitignore, adicione:
node_modules/
.env

Passo 4: Criar o Servidor
Criar o Servidor (server.js)
Crie o arquivo server.js e adicione:
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});








Passo 5: Criar a Estrutura do Projeto
Estrutura do Projeto
sistema-de-gestao-de-ingressos/
│── src/
│   ├── models/
│   │   ├── ingressoModel.js
│   ├── config/
│   │   ├── database.js
│   ├── database/
│   │   ├── schema.sql
│   ├── controllers/
│   │   ├── ingressoController.js
│   │   ├── reportController.js
│   ├── routes/
│   │   ├── ingressoRoutes.js
│   │   ├── reportRoutes.js
│── .env
│── package.json
│── .gitignore
│── server.js





 Passo 6: Atualizar o server.js com a Rota
Edite server.js e adicione:
const usersRoutes = require("./routes/usersRoutes");


 Passo 7: Testar a API
Use Postman ou Insomnia para testar as seguintes rotas:
EXEMPLO
Criar usuário (POST http://localhost:3000/usuarios)
Listar usuários (GET http://localhost:3000/usuarios)
Buscar usuário por ID (GET http://localhost:3000/usuarios/{id})
Remover usuário (DELETE http://localhost:3000/usuarios/{id})
