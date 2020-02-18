Angular Material Starter
=======================

A boilerplate for Material Design applications using Angular 1.x and Angular Material.

Structure
---------

All files for each particular module are separated into their own folders, typically each module has a dedicated route.

```
.
├── public/
│   ├── modules/       			# Modules
│   │   ├── exampleModule/
│   │   │   ├── controllers/
│   │   │   │   ├── exampleCtrl.js
│   │   │   ├── services/
│   │   │   │   ├── exampleService.js
│   │   │   ├── css/
│   │   │   │   ├── example.css
│   │   │   ├── views/ 
│   │   │   │   ├── example.html
|   |   |   |   |
|   |   ├── Submodules/
|   |   |   |   ├── exampleModule/
|   |   |   |   ├── controllers/
|   |   |   |   │   ├── exampleCtrl.js
|   |   |   |   ├── services/
|   |   |   |   │   ├── exampleService.js
|   |   |   |   ├── css/
|   |   |   |   │   ├── example.css
│   │   │   ├── views/ 
│   │   │   │   ├── example.html
|   |   |   |   |
|   |   |   |   |
│   ├── app.controller.js       # Main controller
│   ├── app.routes.js           # App routes
│   ├── app.js                 	# Main app file
│   ├── home.html 				# Homepage template
│   ├── index.html              # Main template
├── index.js                    # Express application
└── package.json                # NPM Dependencies and scripts
```

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/blakemanzo/angular-material-starter.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Run NPM
npm start

Your app will then be running on port 5000.
```
---

## Considere começar a mensagem de Commit com um emoji aplicável:
---
    * :art: `:art:` quando melhorar o formato/estrutura do código
    * :racehorse: `:racehorse:` quando melhorar o desempenho
    * :memo: `:memo:` ao escrever documentos
    * :bug: `:bug:` quando corrigir um bug
    * :fire: `:fire:` quando remover códigos ou arquivos
    * :green_heart: `:green_heart:` quando corrigir a build da CI
    * :white_check_mark: `:white_check_mark:` ao adicionar testes
    * :lock: `:lock:` quando se trata de segurança
    * :arrow_up: `:arrow_up:` ao atualizar dependências
    * :arrow_down: `:arrow_down:` ao diminuir dependências
    * :shirt: `:shirt:` ao remover avisos de linter/eslint/..