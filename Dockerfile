FROM node:12-alpine

WORKDIR /usr/src/api

COPY dist/ .

# Uncomment the following if you are excluding all your external dependencies.
# It is an option if happen to be having troubles with your bundling.
# You can install them in the docker image instead.
# refer to: https://github.com/nestjs/nest/issues/1706
# ------------------------------------------------------------------
# COPY package*.json ./
# RUN npm ci --production

ENV PORT=3001
EXPOSE ${PORT}

CMD [ "node", "main.js" ]