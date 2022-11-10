# expert-couscous

## Description

This project is a fully back-end server based API based around a user's ability to simulate RESTful routes and database interaction whilst not using MySQL, instead 
utilizing mongoDB and Mongoose models in order to serve RESTful requests in order to get, post, put, and delete Users, Thoughts, and Reactions. By utilizing a NoSQL
database, the data is able to be easily initalized manipulated to one's content through route testing resources and serves as a great exercise in learning about how
alternative databases to MySQL can be used to handle data.

## Installation

In order to install the project, first make sure to either clone or download the repository to your local machine. From there, you will want to open a command line from
within the project and ensure that all of the packages are installed by typing in "npm install", after just a few moments, your code should be ready to go! The only
other thing that is required for a development enviroment is your choice of third party API route testing software, I personally recommend Insomnia, but you can use any
as you please.

## Usage

Once the repository has been installed proper, and your route testing application ready, simply type "node index.js" into the command terminal to start a local server.
From there, you can test the seven different routes within: GET and POST to /api/users, GET, PUT, DELETE to /api/users/(userId), 
POST and DELETE to //api/users/:userId/friends/:friendId. GET and POST to /api/thoughts, GET, PUT, DELETE to /api/thoughts/(thoughtId),
POST to /api/thoughts/:thoughtId/reactions, and DELETE to /api/thoughts/:thoughtId/reactions/:reactionId. Be sure to format your data for JSON to test the routes.

[Video demo link](https://drive.google.com/file/d/1LHMwnOjgaPyagd0ealL_N_MN-6tX9zsR/view)

## Credits

[MongoDB](https://www.mongodb.com/)

[Mongoose](https://mongoosejs.com/)

[Node.js](https://nodejs.org/en/)

[Express](https://expressjs.com/)

## License

Licensed by the MIT License: Do as you will, I bear no responsibility if it breaks.
