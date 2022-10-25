# E-commerce Pizza Restaurant Website
NOT MAINTAINED ANYMORE

E-commerce website using MERN stack (Mongo, Express, React, Node).  
I have built this App for a client from Romania. Please translate to English from browser when you go to my live App in order to see the products in English.

The back-end is in the root directory. 'index.js' is the main file, 'src' folder contains the source code of the API designed following the MVC(Model, View, Controller) design pattern.  
The front-end is in the 'client' folder from the root directory.

## Tech Stack

- [ReactJs](https://reactjs.org/) for the front-end
- [NodeJs](https://nodejs.org/en/) & [Express](http://expressjs.com/) for the back-end
- [MongoDB](https://www.mongodb.com/) for the database
- [Auth0](https://auth0.com/docs) for Authentification
- [Mailjet](https://www.mailjet.com/) for Sending Email

## Features

- Admins manage and control the Products Collection
- Product search feature
- Shopping Cart
- Checkout process
- User profile
- History of orders
- Status of Order
- Email order to the restaurant

## Prerequisite

- node
- npm
- mongodb

## Additional dependencies

- material-ui
- react-bootstrap
- react-router-dom
- mongoose
- cors

## Dev dependencies

- nodemon
- ESLint
- Prettier

## How to run local

Clone the repo

```
git clone git@github.com:SilviuAndreiChivescu/pizza-website.git
```

Create a copy of '.env.example' file from the root directory. Rename it to '.env', open it and replace the placeholder. Do the same in the client folder.

Install dependencies for server & client

```
npm install && npm run client-install
```

Start the server

```
npm run start
```

Open new terminal and start front-end

```
npm run client-start
```

Server runs on http://localhost:3001 and client on http://localhost:3000

## Resources:

Auth0 - https://auth0.com/blog/complete-guide-to-react-user-authentication/

Mailjet - https://www.npmjs.com/package/node-mailjet

Deploy to Heroku - https://coursework.vschool.io/deploying-mern-app-to-heroku/

MongoDB Connection - https://youtu.be/wgGkF4k9c7A

## License

This project is licensed under the MIT License
