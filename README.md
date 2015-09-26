# API Starter
Contains the necessary foundation to have a RESTful API service ready to go. Complete with token based user authentication.

[Expresss, Mongoose, MongoDB]

## Getting Started
Install required dependencies:
```
git clone https://github.com/luoto/api-starter
cd api-starter
npm init
```
Start the API server using:
```
npm start
```

Start adding in your own routes, models, and controllers.

## Directory Structure
```
.
├── src
│   ├── api
│   │   ├── config
│   │   ├── controllers
│   │   ├── db
│   │   ├── middleware
│   │   ├── models
│   │   ├── router
│   │   ├── utils
│   │   └── server.js
│   └── index.js
├── tests
│   └── api
├── package.json
└── README.md
```

## Testing
Run tests:
```
npm test
```

## Pipline
* Token refresh
* Token blacklist
* Google+ OAuth support
* Facebook OAuth support
* ES2015

## Prerequisites
 * [NodeJS](https://nodejs.org/en/)
 * [MongoDB](https://www.mongodb.org/downloads#production)

## F.A.Q
#### Why is there no logout route?
  * Currently, the way to log out users is to delete the JWT on the client side or when the token expires. Token refreshes and blacklists will be used to remedy this problem in future releases.

#### What JSON response format is used?
  * [JSend](https://labs.omniti.com/labs/jsend)

#### Have another question or a suggestion?
  * Submit an issue :)

## Resources
...

## License
MIT
