# 💥 Nest 🔰 Webpack 🔰 Docker 💥

This repo is a starting point for others who wish to build a [Nest](https://github.com/nestjs/nest) app with minimal footprint. Bundling dependencies with Webpack, and containerized for Docker.

|                                                                                 |    Size     |
| ------------------------------------------------------------------------------- | :---------: |
| production bundle of a `main.js` "Hello World!"                                 | **1.49 MB** |
| Containerized as a Docker image [node:12-alpine](https://hub.docker.com/_/node) | **81.9 MB** |

The Alpine variant of Node.js - Docker base image is being used for minimal footprint. Node.js v12 has improved startup times over an already performant startup process. This enables Nest to be an excellent solution for a microservice architecture. Allowing for efficient spinning up of new Kubernetes pods to meet compute demands, and disposed as necessary. Written in Typescript, Nest allows for a familiar, and more declarative development experience for writing modern web services. Check out the [official docs](https://docs.nestjs.com/) to learn more.

This repo demonstrates the minimal amount needed to integrate a bundling system and containerize the app as a Docker image. Though for commercial projects, I would strongly suggest using a project management tool like Nx, by the company Nrwl. [Getting Started with Nx](https://nx.dev/angular/getting-started/getting-started). It makes full stack development with Nest simple. Nest schematics even work with [Angular Console - VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), with zero configuration needed.

#

This repo is produced from a fresh `nest new` command, using [nest-cli](https://docs.nestjs.com/cli/usages), with minimal modification. Currently there are some intricacies for bundling dependencies for a Nest app. [(Issue: #1706)](https://github.com/nestjs/nest/issues/1706) Comments are included in the `Dockerfile` and `webpack.config.json` for clarification. This repo addresses the known issues for you. 🥂

The following packages were added to the default `package.json`.

```bash
webpack@latest
webpack-cli@latest
ts-loader@latest
tsconfig-paths-webpack-plugin@latest  # For targeting "tsconfig.build.json"
```

3 scripts have been added to the `package.json`

```bash
# Bundle with webpack
npm run build:prod

# Build the docker image
npm run docker:build

# Run the docker image
npm run docker:run
```

For containerization, ensure your app uses the port from the environment if it exists.

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
