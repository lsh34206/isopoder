const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://lsh34206:shhs1004@cluster0.amaaaue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function (callback){
    return MongoClient.connect(uri,callback);
};