FROM node:9-alpine

EXPOSE 4200

# install angular-cli as node user
RUN chown -R node:node /usr/local/lib/node_modules \
  && chown -R node:node /usr/local/bin

USER node
RUN npm install -g @angular/cli@6.0.8

# set npm as default package manager for root
USER root
RUN ng set --global packageManager=npm

# install chromium for headless browser tests
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN apk add --no-cache chromium udev ttf-freefont

WORKDIR /home/dev

COPY ./ /home/dev/

CMD ng serve --host 0.0.0.0

