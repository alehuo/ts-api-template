FROM node:10.16.2
WORKDIR /api

RUN adduser --disabled-password --gecos "" apiuser && \
    chown -R apiuser:apiuser /home/apiuser /usr/local/lib/node_modules /usr/local/bin /api

USER apiuser

RUN npm install -g purescript spago

COPY packages.dhall spago.dhall ./
RUN spago install

COPY package*.json .eslintrc.js .eslintignore webpack*.js tsconfig.json ./
RUN npm install

COPY src ./src

RUN npm run build

CMD ["node", "dist/bundle.js"]