# mern-app-boilerpate [![Build Status](https://travis-ci.com/alexsalomon/mern-app-boilerplate.svg?branch=master)](https://travis-ci.com/alexsalomon/mern-app-boilerplate)

Project starter for developing MERN (MongoDB, Express, React and Node) applications.

## What's included

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/) with [STRV's config](https://github.com/strvcom/eslint-config-javascript)
- [Nodemon](https://github.com/remy/nodemon) to restart the server whenever you make changes

> NOTE: List needs to be updated...

## Set up
* Install GIT, NodeJS 10+, NPM, and Docker.
```sh
# Clone the repo and change directory
$ git clone https://github.com/alexsalomon/mern-app-boilerplate.git [PROJECT_NAME] && cd [PROJECT_NAME]

# Set up the Remotes
$ git remote set-url origin [MY_REPOSITORY_URL]
$ git remote add upstream https://github.com/alexsalomon/node-exp-api-boilerplate.git
$ git remote -v

# Push changes to your remote repository:
$ git push origin master

# Recommended: install the following packages globally:
$ sudo npm install -g nodemon nps

# Create a .env file from .env.example and modify it as needed:
$ cp .env.example .env

# Create a server/.env file from server/.env.example and modify it as needed:
$ cp server/.env.example server/.env

# Install server dependencies (necessary for testing. This may change in the future)
$ cd server && npm install && cd -

# Build and run all containers
$ docker-compose up --build
```

> NOTE: If you change a service's `Dockerfile` or the contents of its build directory, run the following to rebuild it:

```sh
$ docker-compose build --force-rm   # Build the services and remove intermediate containers
$ docker-compose up                 # Builds, (re)creates, starts, and attaches to containers for a service.
```

## Deploy
* Download and install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli)
* In terminal, run the following (One time setup):
```sh
  # Login with your Heroku credentials:
  $ heroku login

  # Navigate to the app directory and create a heroku app:
  $ cd [PROJECT_NAME]
  $ heroku create [HEROKU_APP_NAME]

  # Set the stack of your app to container:
  $ heroku stack:set container

  # Set up required environment variables (Check .env.example for the complete list):
  $ heroku config:set JWT_SECRET=yoursecrethere SENTRY_DNS=yoursecrethere

  # Push the code to heroku:
  $ git push heroku master

  # Open the application in your browser
  $ heroku open
```

If you have already created your Heroku app previously, you can easily add a remote to your local repository with the following command:
```
  $ heroku git:remote -a [HEROKU_APP_NAME]
```

For all subsequent deployments just do a push and heroku will automatically do the rest for you:
```
  $ git push heroku master
```

### Troubleshooting:
Check out heroku's logs by typing the following command:
```
  $ heroku logs --tail
```

#### Error code=H14 desc="No web processes running":
Add dynos to your heroku containers:
```
  $ heroku ps:scale server=1
  $ heroku ps:scale client=1
```

## [Sentry](https://sentry.io/)
Sentry is an error tracking service that helps developers monitor and fix crashes as they happen in production.
