# Project: Todo app demo

Demonstration of a web app capable of managing todo lists and synchronize with Google Calendar.

## ✏ About this project

The aim of this project is to develop a web app that allows users to keep track of their tasks and keep them in sync with Google Calendar.

It offers a RESTful API to allow users to create, modify and manage todo lists and to sync them to their Google Calendar.

The app was developed using <strong>MSC architecture</strong> - Model, Service, Controller - implemented with <strong>Node.js</strong> and <strong>ORM Sequelize</strong> for list managing via CRUD.

<strong>JWT - Jason Web Token</strong> was used to handle token authentication as well as Google's Authentication API

## 🛸 Main technologies used

- [Node.js](https://nodejs.org/en/);
- [Express.js](https://expressjs.com/);
- [MYSQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Sequelize(ORM)](https://sequelize.org/);
- [JWT(Autenticação)](https://jwt.io/);
- [TypeScript](https://www.typescriptlang.org);
- [Docker](https://www.docker.com/);
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript);

## ⚙ How to run this project locally

<strong>1. Clone the repository and change directory to it:</strong>

- Kindly check that the current working directory is the desired one before proceeding

 
 git clone git@github.com:CarolinaKauark/to-do-app_frontend.git
 cd to-do-app_frontend
 

 <strong>2. Choose your preferred development environment: Docker or Local</strong>

<details>
  <summary><strong>🐳 Using Docker</strong></summary>
  </br>

  *:warning: Ensure docker-compose is at 1.29 or higher.*

  👉 <strong> 2.1 Run services `node` e `db` using: </strong>

  
  docker-compose up -d --build
  

- These services will run a container named `todo_app_backend` and another called `todo_app_db`;

- From hereafter you can run the container named `todo_app_backend` via CLI or run it using VSCode;

  👉 <strong>2.2 Use o comando:</strong>

  
  docker exec -it todo_app_backend bash
  

- This will allow you to access an interactive shell in the container created by the compose file

  👉 <strong>2.3 Install dependencies inside the container using:</strong>

  
  npm install

  👉 <strong>2.3 Run theses scripts to start the backend service:</strong>
  npm run predev
  npm run dev
  
  
</details>

<details>
  <summary><strong> 💻 Developing locally</strong></summary>
</br>

👉 <strong>2.1 Install dependencies: </strong>


npm install

</details>

 ---
© Developed by [Carolina Kauark Fontes](https://www.linkedin.com/in/carolina-kauark-fontes/)