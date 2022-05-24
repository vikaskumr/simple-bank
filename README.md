## Description

Simple Bank App exposing account Api
Since this app is made with docker so please install all the necessary softwares to run docker on your local system
https://docs.docker.com/get-docker/

## Installation

```bash
$ npm install
```

## Swagger

Swagger is available on route `{{API_HOST}}/docs`.
Postman collection to import is available under `${{API_HOST}}/docs-json`

## Environment variables

```bash
make a .env file in the root directory and place the below value

NODE_ENV=development
DATABASE_URL=
APP_PORT=3000

make a docker.env file in the root directory and place the below value

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

## Running the app

```bash
docker compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
