# 💥 Nest 🔰 Webpack 🔰 Docker 💥

This repo is a starting point for others who wish to build a [Nest](https://github.com/nestjs/nest) app with minimal footprint. Bundling dependencies using Webpack, and containerized for Docker.

The repo was produced from a fresh `nest new` command, using [nest-cli](https://docs.nestjs.com/cli/usages), with minimal modification. Currently there are some intricacies to bundling dependencies for a Nest app. Please refer to: https://github.com/nestjs/nest/issues/1706

For clarification, comments are included in the `Dockerfile` and `webpack.config.json`.

The Alpine variant of Node.js' Docker base image [node:12-alpine](https://hub.docker.com/_/node) is being used for minimal footprint.

3 new commands have been introduce in the `package.json`

```bash
# Bundle with webpack
npm run build:prod

# Build the docker image
npm run docker:build

# Run the docker image
npm run docker:run
```

For containerization, ensure your app is using the port from the environment if it exists.

**"main.ts"**

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For Docker containerization
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Server is running at http://localhost:${PORT}`);
}
bootstrap();
```
