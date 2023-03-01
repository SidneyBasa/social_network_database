// Monday February 27, 2023 - Sidney Basa
// import mongoose and destructure the object to use connect and connection
const {connect, connection} = require('mongoose');

// Setting up a mongoDB instance to choose between a an environment variable generated by Heroku or the mongo db address
// for the local database
const ConnectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

// connection string, the other two properties are to prevent known errors from occurring
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// export the mongoose connection
module.exports = connection;