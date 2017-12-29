# Jincor Frontend Messenger

[![Build Status](https://travis-ci.com/JincorTech/frontend-messenger.svg?token=zhVTspsPSE9j1Tuwzqe2&branch=develop)](https://travis-ci.com/JincorTech/frontend-messenger)

----------------------------

## Description

This frontend application is an instant messenger which help employees to communicate with each other.

## Build & Run

  1. Install [Git](http://git-scm.com/) and [Node](http://nodejs.org/)

  2. Open your terminal and clone `JincorTech/frontend-messenger` by running:
    ```
    $ git clone git@github.com:JincorTech/frontend-messenger.git
    ```

  3. Now go to the project's folder:
    ```
    $ cd frontend-messenger
    ```

  4. Install dependencies:
    ```
    $ npm install
    ```
  
  5. Start in development mode:
    ```
    $ npm start
    ```

  To build the project in production mode:
    ```
    $ npm run build
    ```

## Configuration

  To connect to the real host you need to pass further NodeJS environment variables:

  COMPANIES_API_HOST - path to the companies api host.

  COMPANIES_API_PREFIX - api prefix for companies api (for example '/api/v1')
  
  MESSENGER_API_HOST - path to the messenger api host.

## Tools & libraries

  The project have these libraries as the base:

  1. [React](https://github.com/facebook/react/)
  2. [Redux](https://github.com/reactjs/redux)
  3. [React-redux](https://github.com/reactjs/react-redux)
  4. [Redux-saga](https://github.com/redux-saga/redux-saga)
  5. [react-css-modules](https://github.com/gajus/react-css-modules)
  6. [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
  7. [i18next](https://github.com/i18next/i18next)
  8. [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk)
  9. [TypeScript](https://github.com/Microsoft/TypeScript)

## Structure

  The project's /src/ directory contains these parts:

  * /assets/ - stores static content
  * /components/ - react presentational components without logic
  * /containers/ - react container components that have a connection to the store and can dispatch actions
  * /helpers/ - helpers that can help to solve different kinds of tasks grouped by they purpose
  * /i18n/ - set up i18n configuration
  * /locales/ - static files with translations grouped by locales and sections of the application
  * /redux/ - reducers and store configuration
  * /sagas/ - redux sagas grouped by section of the store and root saga
  * /utils/ - utilities for different tasks such as creating actions, validators etc.

## Matrix SDK

  For message exchange process the project use [Matrix Javascript SDK](https://github.com/matrix-org/matrix-js-sdk).

  The most part of the matrix dependent code is placed in three places:

  * /src/utils/matrix/index.ts - creation and working with MatrixClient instance
  * /src/utils/matrix/messagesService.ts - MessagesService is a service that encapsulates working with matrix client and exports more common interface.
  * /src/helpers/matrix/index.ts - more common helper functions that dependent on matrix id's, structures etc.

  Also there are few places with explicit connection to the matrix events. For example in the /containers/messenger/messagesArea container.

---------------------------

[Jincor Tech](https://github.com/JincorTech)
