const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");
var collection;
module.exports= async (req,res) =>{
  res.clearCookie("name");
    res.redirect('/main');
   


};