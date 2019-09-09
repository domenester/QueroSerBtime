## Description

This API uses [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Dependecies

Postgres must be running at http://127.0.0.1:5432


## Endpoints

```bash

POST: /play/:room/:nickname/:play
( Play values: 'rock' | 'sissors' | 'paper' )

GET: /play/:room/:nickname/
( Return values: 'win' | 'lose' | 'draw' )

```
