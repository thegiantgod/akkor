# akkor

This is the web app of the Akkor Hotel company. This app is built to let people find and choose hotels to make reservations online. There is the frontend stack built in React (akkor-frontend) and the backend stack made in Node/Express with a mongodb database (akkor-api).


## akkor-frontend

This is the frontend part of the Akkor web app (the visuals of the website), it is built with React and JavaScript. To run it, you need to follow the next steps :
1. Open a termial and go in the app folder by typing `cd ./akkor-frontend`.
2. Type in `npm install` to install all the dependencies.
3. Type in `npm start` to launch the project.
4. If your browser did not open a tab of the app, connect to the url <http://localhost:3000> or <http://localhost:3001> depending on the port the app used.

If the console tells you that port 3000 is already in use and asks if you want to run it on port 3001, type in yes and it will launch the app.

If you want to run the tests, type in the terminal `npm test`.
If you want to run the app for production, type in the terminal `npm run build`. This build will prepare you app for full deployement.


## akkor-api

This is the API/backend of the web app, it is built with Express.js.


To try out the API, a swagger documentation is available for the api, you can check it out after running the app and opening this url : <http://localhost:8000/api-docs/>.

You can run it by typing `npm install` and then `npm start` in the terminal in the folder `akkor-api`.
If you want to run the tests, you can type in the terminal `npm test`.
If you want to regenerate the swagger documentation, you can type in the terminal `npm run swagger-autogen`.

If you get an error when running `npm start` saying that your IP may not be whitelisted, please contact our administrator at this address <ludovic.borges@supinfo.com> with your IP to be whitelisted, to be verified and allowed to connect our database.

All write endpoints except the creation of a user are protected by jwt authentification, to get a valid token, send a request to login a user, the token generated will be in the header "token" and will be valid for 30 minutes.

Hotel write endpoints are protected and to work, you need to send a header "role" with value "admin" so only admin users can write on hotels database.