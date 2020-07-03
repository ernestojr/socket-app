# Socket IO app

This project was bootstrapped with [Express Generator](https://expressjs.com/).

This app implement socket io with redis for multiple nodes.

### Install dependecies
With NPM:
```sh
$ npm i
```
or Yarn:
```sh
$ yarn
```
### Run app in develop env
With NPM:
```sh
$ npm run dev
```
or Yarn:
```sh
$ yarn run dev
```
### Run app in production env
With node js:
```sh
$ npm start
```
or Yarn:
```sh
$ yarn start
```

### Environment variables

These are the environment variables

| Variable | Description |
| ------ | ------ |
| PORT | Port of the app |
| NODE_ID | Node id |
| REDIS_HOST | Redis host |
| REDIS_PORT | Redis Port |
| REDIS_PASSWORD | Redis passport |
| REDIS_DB | Redis db index |