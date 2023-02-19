const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

module.exports.connect = async () => {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    };

    await mongoose.connect(uri, mongooseOpts);
}