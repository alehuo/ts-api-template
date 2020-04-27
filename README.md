# ts-api-template

![](assets/img/ts-api-1x.png)

A template for boilerplating a Node.js TypeScript Express API. Support for importing PureScript modules is included. Database migrations are made with Sequelize. Swagger endpoint is located at `/docs` to add documentation for your API.

## Requirements

- Bower
- Node.js 10.16.2
- Docker

## Installation instructions

1. Run `bower install`
2. Run `npm install`

### Development

3. Run `npm run build` to bundle the app
4. Run `npm start` to start the app

### Production

3. Run `npm run build:dev` to start webpack in watch mode
4. Run `npm start:dev` to start nodemon

### With Docker

You can run the whole stack with `docker-compose up -d --build`.

## License

MIT license
