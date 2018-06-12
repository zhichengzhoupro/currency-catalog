FROM node:9-alpine

EXPOSE 8000

# install angular-cli as node user
RUN chown -R node:node /usr/local/lib/node_modules \
  && chown -R node:node /usr/local/bin

USER node
RUN npm install -g @angular/cli@6.0.8

# set npm as default package manager for root
USER root
RUN ng set --global packageManager=npm

RUN npm i npm@latest -g


WORKDIR /home/dev

COPY ./ /home/dev/

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

CMD ng serve --host 0.0.0.0 --port 8000

