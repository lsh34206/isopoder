const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");

module.exports={
    free_get: async (req,res) =>{
        collection = await db_connect.board_free();
            const id= req.params.id;
        var content = await collection.findOne({id:id});
    
       
       let board_free_viewed =  req.cookies.board_free_viewed ? JSON.parse(req.cookies.board_free_viewed) : [];
    
    if(!board_free_viewed.includes(id)){
         await collection.updateOne({id:id},{$inc:{hit:1}});
    
            board_free_viewed.push(id);
            res.cookie("board_free_viewed",JSON.stringify(board_free_viewed),{
                maxAge:1000*60*50,
                httpOnly:true
            
            });
        }
    content = await collection.findOne({id:id});
        res.render("content",{myname:req.cookies.name,title:content.title,writer:content.writer,date:content.date,
            hit:content.hit,content:content.content,like:content.like.length,bad:content.bad.length,comment:content.comment
        });
    
    

    },




free_post:async (req,res) =>{
const mode = req.body.mode;
  const name = req.cookies.name;
  const content_id = req.body.contentId;
  try{
      const users_db_collection = await db_connect.user();
  const board_free_db_collection = await db_connect.board_free();

    var user_id = await users_db_collection.findOne({name:name});
    user_id = user_id.id;
    const board_free_content_load = await board_free_db_collection.findOne({id:content_id});
    if(mode == "gaechu"){
        var like = board_free_content_load.like;
        if(like.includes(user_id)){
            like = like.filter(x => x !== user_id);
            await board_free_db_collection.updateOne({id:content_id},{$set:{like:like}});
        }else{
            like.push(user_id);
            await board_free_db_collection.updateOne({id:content_id},{$set:{like:like}});
        }
    }else if(mode == "beechu"){
        var bad = board_free_content_load.bad;
        if(bad.includes(user_id)){
            bad = bad.filter(x => x !== user_id);
            await board_free_db_collection.updateOne({id:content_id},{$set:{bad:bad}});
        }else{
            bad.push(user_id);
            await board_free_db_collection.updateOne({id:content_id},{$set:{bad:bad}});
        }
    }
   
    res.status(200).json({success:true});
  }catch(err){

    console.error(err);
    res.status(500).json({success:false,message:"서버오류"});
  }

},





default:async (req,res) =>{
   collection = await db_connect.board_free();

        const writings = await collection.find({}).toArray();
        const count = await collection.countDocuments({});
    if(req.cookies.name){
    if(count == 0){
 res.render("free_board",{myname:req.cookies.name});
    }else{
          res.render("free_board",{myname:req.cookies.name,writings:writings});
    }
  
    }else{
         res.render("free_board",{myname:"GUEST",writings:writings});
    }
},






main:async (req,res) =>{
      collection = await db_connect.user();
  if(req.cookies.name){
        res.render("main",{myname:req.cookies.name});
  }else{
            res.render("main",{myname:"GUEST"});
      
  }
},






caresheet:async (req,res) =>{
      collection = await db_connect.user();
        if(req.cookies.name){
        res.render("caresheet",{myname:req.cookies.name});
        }else{
             res.render("caresheet",{myname:"GUEST"});
        }
}

};