const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");
const bcrypt= require("bcrypt");

var collection;
module.exports= {
    join:async (req,res) =>{
 collection = await db_connect.user();
    if(req.cookies.name){
    res.render("join",{myname:req.cookies.name});
    }else{
         res.render("join",{myname:"GUEST"});
    }
   
},
join_ok:async (req,res)=>{
 collection = await db_connect.user();
    const name = req.body.name;
      const id = req.body.id;
    const name_check =  await collection.findOne({name:name});
        const id_check =  await collection.findOne({id:id});
    const pw_check = req.body.pw == req.body.pw_check;
    if(name_check){
         res.send("<script>alert('닉네임중복');location.href='/join';</script>");
  
    }
    if(id_check){
         res.send("<script>alert('아이디 중복');location.href='/join';</script>");
  
    }
     if(!pw_check){
         res.send("<script>alert('비번불일치');location.href='/join';</script>");
       
    }
    if(!name_check&&pw_check){
        const join = await collection.insertOne({id:req.body.id, email:req.body.email, name:req.body.name, password:await bcrypt.hash(req.body.pw,10), xp:0, lv:1});

    }
    
    res.redirect("/main");
}

};