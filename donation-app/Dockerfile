# pull base image
FROM node:16.19.0
USER root

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
ENV PATH /opt/app/.bin:$PATH

RUN mkdir /opt/app && chown node:node /opt/app
WORKDIR /opt/app
COPY . .

RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest
RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["web"]