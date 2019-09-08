FROM node:12-alpine

WORKDIR /usr/src/api

COPY dist/ .

# Uncomment the following if you are excluding all your external dependencies.
# It is an option if you happen to be having problems with your bundling.
# You can install them in the docker image instead. Though this should not
# be necessary. Refer to: https://github.com/nestjs/nest/issues/1706
# ------------------------------------------------------------------
# COPY package*.json ./
# RUN npm ci --production

ENV PORT=3000
EXPOSE ${PORT}

CMD [ "node", "main.js" ]