# nimpi-search

Requisitos.
  * Servidor Elasticsearch
  * Servidor MongoDB
  * Nodejs

Instalar dependências NodeJS.
$ sudo npm install
$ sudo npm install -g pm2

* Para ambientes de desenvolvimento
<p>$ sudo npm install -g nodemom

* Iniciar aplicação em ambientes de produção
$ npm run start

* Iniciar aplicação em ambiente de desenvolvimento
$ npm run dev

** Configuração do ambiente **
No arquivo .env defina suas configurações.
* PORT_API -> Configuração da porta HTTP da sua API de Busca
* DB_CONNET -> Cadeia URL de conexão do MongoDB

* HOST_ELASTIC -> Endereço do servidor Elasticsearch
* PORT_ELASTIC -> Porta do servidor Elasticsearch
* USER_ELASTIC -> Usuário Elasticsearch
* PASSWORD_ELASTIC -> Senha atribuída ao usuário do ElasticSearch

* BUCKET_NAME -> Nome da base de dados que será indexada a partir do MongoDB

* USER_AUTH -> Usuário de autenticação da API
* PASSWORD ->  Senha atribuída ao usuário de autenticação da API

* API -> Versão atribuída a API

** Autenticando a conexão com API **
Utilizar-se de usuário e senha programados no arquivo .env da aplicação, e autenticá-lo utilizando Basic authentication.

Ambiente testado em ambientes de servidores linux.
