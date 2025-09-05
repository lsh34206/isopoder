const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");
var collection;
module.exports= {
    write:async (req,res) =>{
 collection = await db_connect.board_free();
    res.render("write",{myname:req.cookies.name});
   
},





write_ok:async (req,res)=>{
collection = await db_connect.board_free();

    await collection.insertOne({
        id:uuidv4(),
        title:req.body.title,
        writer:req.body.writer,
        content:req.body.content,
        date:utils.date(),
        like:[],
        bad:[],
        hit:0,
        comment:[]
    });

    res.redirect("/board/free");
},





delete:async (req,res)=>{
 const board_free_db_collection = await db_connect.board_free();
 const writing_id =  req.body.writing_id;
    const board =  req.body.board;
    try{

if(board=="free"){
    //const writing_load = await board_free_db_collection.findOne({id:writing_id});


    await board_free_db_collection.deleteOne({id:writing_id});
}

  res.status(200).json({success:true});
    }catch(err){
          console.error(err);
    res.status(500).json({success:false,message:"서버오류"});
    }
}

};