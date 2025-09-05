const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");
const bcrypt = require("bcrypt");
var collection;
module.exports= {
    login:async (req,res) =>{
            collection = await db_connect.user();
        if(req.cookies.name){
        res.render("login",{myname:req.cookies.name});
        }else{
           res.render("login",{myname:"GUEST"});  
        }
    },
login_ok:async (req,res)=>{
    collection = await db_connect.user();
   const id_search = await collection.findOne({id:req.body.id});
if(await bcrypt.compare(req.body.pw,id_search.password)){
  

     res.cookie("name",id_search.name,{
            maxAge:1000*60*60,
            httpOnly:true
        
        });
    res.redirect("/main");
}else{
    res.send("<script>alert('비번틀림');location.href='/login';</script>");
    
}
}

};