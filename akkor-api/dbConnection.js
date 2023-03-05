
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;

    const connectDB = async () => {
        let dbUrl = process.env.DATABASE_CONNECTION_URL;
    if (process.env.NODE_ENV?.trim() === 'test') {
        console.log("TEST ! \n")
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
    }

    mongoose.connect(dbUrl);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', () => {
    console.log("Connection Successful!");
    });
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
        await mongod.stop();
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = { connectDB, disconnectDB };