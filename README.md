Repositorios

Front end

https://github.com/victordanielmun/mern-crud-auth-frontend 

Backend 

https://github.com/victordanielmun/mern-crud-auth-backend

crear docker-compose.yml

#MongoDb Docker

version: '3.8'

services:
  tasksdb:
    image: mongo
    container_name: tasksdb
    restart: always
    ports:
      - 27017:27017
