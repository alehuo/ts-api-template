# ts-api-template

![](assets/img/ts-api-1x.png)

A template for boilerplating a Node.js TypeScript Express API. Support for importing PureScript modules is included. Database migrations are made with Sequelize.

## Requirements

- Bower
- Node.js 10.16.2
- Docker

## Instructions

1. Run `bower install`
2. Run `npm install`
3. Run `npm run build` to build a production bundle
4. Run `npm start` to start the server

## Development

1. Run `bower install`
2. Run `npm install`
3. Run `npm run build:dev` to start webpack in watch mode
4. Run `npm start:dev` to start nodemon

## Docker

1. Run `docker build . -t ts-api`
2. Run `docker run -it -p 80:8080 tsapi:latest`

## License

MIT license
