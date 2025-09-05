const mongodb_connection = require("./mongodb-connection");
var collection;
module.exports={
    board_free: async function board_free_db_connect(){
          const mongodb= await mongodb_connection();
        collection = mongodb.db("isopoder").collection("board_free");
        return collection;
    },
    user:async function user_db_connect(){
          const mongodb= await mongodb_connection();
        collection = mongodb.db("isopoder").collection("user");
        return collection;
    }
}