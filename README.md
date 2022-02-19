![MIT license](https://img.shields.io/badge/license-MIT-green.svg?style=plastic "MIT")
![Version v1.1.0](https://img.shields.io/badge/version-v1.1.0-blue.svg?style=plastic "Version v1.1.0")

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

![Node.js](https://img.shields.io/badge/Node.js-14.18.2(Fermium)-yellow.svg?style=plastic "Node.js")

# Express http server skeleton

```
git clone ssh://git@github.com/klimby/node-express-skeleton.git

cd node-express-skeleton

npm install
```

## Env variables

```
NODE_SERVER_PORT=3000
NODE_ENV=development
LOCALE=en
```

## Npm scripts

- **server:watch** - run server in dev mode;
- **build** - build in `./dist` dir;
- **lint** - run linter (eslint);
- **test** - run tests;
- **test:coverage** - runt tests with coverage.
- 
## Make commands

- `make up` - up docker compose in ./docker-test dir;
- `make down` - down docker compose in ./docker-test dir;
- `make build` - create image and push to docker hub;
- `make create` - create image;
- `make enter` - enter in server container;
