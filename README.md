# 💥 Nest 🔰 Webpack 🔰 Docker 💥

This repo is a starting point for others who wish to build a [Nest](https://github.com/nestjs/nest) app with minimal footprint. Bundling dependencies with Webpack, and containerized for Docker.

|                                                                                 |    Size    |
| ------------------------------------------------------------------------------- | :--------: |
| production build of `main.js` "Hello World!"                                    | **1.49MB** |
| Containerized as a Docker image [node:12-alpine](https://hub.docker.com/_/node) | **81.9MB** |

The Alpine variant of Node.js' Docker base image is being used for minimal footprint. Node.js v12 has improved startup times over an already performant startup. This enables Nest to be an excellent solution for a microservice architecture. Spun up as a stateless Kubernetes pods as load demands, and disposed as necessary.

The repo is produced from a fresh `nest new` command, using [nest-cli](https://docs.nestjs.com/cli/usages), with minimal modification. Currently there are some intricacies to bundling dependencies for a Nest app. Please refer to: [Issue: #1706](https://github.com/nestjs/nest/issues/1706). For clarification, comments are included in the `Dockerfile` and `webpack.config.json`.

The following packages were added to the default `package.json`.

```bash
webpack@latest

webpack-cli@latest

# used for targeting the "tsconfig.build.json"
tsconfig-paths-webpack-plugin@latest
```

Also 3 new scripts have been introduced in the `package.json`

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
