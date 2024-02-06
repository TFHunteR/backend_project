## Student Management Syatem


## Requirements

* Build in Node v16.16.0 LTS
* MySQL 5.7
* sequelize-cli

## Common setup

Clone the repo and install the dependencies.

```bash
git clone git@github.com:jsamonte17/sms_api.git
cd sms_api
```

```bash
yarn or npm install
```

## Database
Setup [MySQL](https://hub.docker.com/r/mysql/mysql-server/) through docker
```bash
docker run --name mysql-5.7 -p 3306:3306 -d mysql/mysql-server:5.7
```

## Database migrations
Run database migrations and seeds
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Steps for running the backend

Step 1: Using CMD/Terminal run the following inside the project directory
```bash
yarn dev
```

## Environmental Variables
Please don't modify .env directly unless a new variable is being defined. Please use/create .env.local to override existing variable in .env# backend_project
