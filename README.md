# akkor

This is the web app of the Akkor Hotel company. This app is built to let people find and choose hotels to make reservations online. There is the frontend stack built in React (akkor-frontend) and the backend stack made in Node/Express with a mongodb database (akkor-api).


## akkor-api

This is the api/backend of the web app, it is built with Express.js.
You can run it by typing `npm install` and then `npm start` in the terminal in the folder `akkor-api`.
If you want to run the tests, you can type in the terminal `npm test`.
If you want to regenerate the swagger documentation, you can type in the terminal `npm run swagger-autogen`.

If you get an error when running `npm start` saying that your IP may not be whitelisted, please contact our administrator at this address <ludovic.borges@supinfo.com> with your IP to be whitelisted, to be verified and allowed to connect our database.

All write endpoints except the creation of a user are protected by jwt authentification, to get a valid token, send a request to login a user, the token generated will be in the header "token" and will be valid for 30 minutes.

Hotel write endpoints are protected and to work, you need to send a header "role" with value "admin" so only admin users can write on hotels database.