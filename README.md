# 💥 Nest 🔰 Webpack 🔰 Docker 💥

## 🏯 Now archived for historical reference ⛩

We've concluded that it is not recommended to bundle NestJS, or actually, NodeJS server apps in general. This is here for historical reference during the period of time when the community was attempting to tree-shake and bundle NestJS apps. Refer to @kamilmysliwiec comment https://github.com/nestjs/nest/issues/1706#issuecomment-579248915 for details:

> In many real-world scenarios (depending on what libraries are being used), you should not bundle Node.js applications (not only NestJS applications) with all dependencies (external packages located in the node_modules folder). Although this may make your docker images smaller (due to tree-shaking), somewhat reduce the memory consumption, slightly increase the bootstrap time (which is particularly useful in the serverless environments), it won't work in combination with many popular libraries commonly used in the ecosystem.
> For instance, if you try to build NestJS (or just express) application with MongoDB, you will see the following error in your console:
>
> ```
> Error: Cannot find module './drivers/node-mongodb-native/connection'
> at webpackEmptyContext
> ```
>
> Why? Because mongoose depends on mongodb which depends on kerberos (C++) and node-gyp.

---

This repo is a starting point for others who wish to build a [Nest](https://github.com/nestjs/nest) app with minimal footprint. Bundling dependencies with Webpack, and containerized for Docker.

|                                                                                 |    Size     |
| ------------------------------------------------------------------------------- | :---------: |
| production bundle of a `main.js` "Hello World!"                                 | **1.49 MB** |
| Containerized as a Docker image [node:12-alpine](https://hub.docker.com/_/node) | **81.9 MB** |

The Alpine variant of Node.js - Docker base image is being used for minimal footprint. Node.js v12 has improved startup times over an already performant startup process. This enables Nest to be an excellent solution for a microservice architecture. Allowing for efficient spinning up of new Kubernetes pods to meet compute demands, and disposed as necessary. Written in Typescript, Nest allows for a more familiar, and declarative development experience for writing modern web services. Check out the [official docs](https://docs.nestjs.com/) to learn more.

This repo demonstrates the minimal amount needed to integrate a bundling system and containerize the app as a Docker image. Though for commercial projects, I would strongly suggest using a project management tool like Nx, by the company Nrwl. [Getting Started with Nx](https://nx.dev/angular/getting-started/getting-started). It makes full stack development with Nest simple. Nest schematics even work with [Angular Console - VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), with zero configuration needed.

#

This repo is produced from a fresh `nest new` command, using [nest-cli](https://docs.nestjs.com/cli/usages), with minimal modifications. Currently there are some intricacies with bundling dependencies for a Nest app. [(Issue: #1706)](https://github.com/nestjs/nest/issues/1706) Comments are included in the `Dockerfile` and `webpack.config.json` for clarification. This repo addresses the known issues for you. 🥂

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
