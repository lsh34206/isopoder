const db_connect = require("../db/db_connect");
const {v4:uuidv4} = require("uuid");
const utils = require("../../utils/utils");

module.exports={
    write: async (req,res) =>{
       const mode = req.query.board;
        const id =req.query.id;
        const name = req.query.name;
         
        try{
     const users_db_collection = await db_connect.user();
      const board_free_db_collection = await db_connect.board_free();
    
      if(mode=="free"){
        const comment = await board_free_db_collection.findOne({id:id});
    
        comment.comment.push({writer:name,comment:req.query.comment,date:utils.date(),id:uuidv4()});
        await board_free_db_collection.updateOne({id:id},{$set:{comment:comment.comment}});
      }
    res.redirect('/board/free/'+id);
    
        }catch(err){
                console.error(err);
        res.status(500).json({success:false,message:"서버오류"});
        }
    },


    
delete:async (req,res) =>{
 const board_free_db_collection = await db_connect.board_free();
 const writing_id =  req.body.writing_id;
  const comment_id =  req.body.comment_id;
    const board =  req.body.board;
    var comment;
    try{

if(board=="free"){

const board_load = await board_free_db_collection.findOne({id:writing_id});
comment =  board_load.comment;
comment.splice(req.body.comment_idx,1);

await board_free_db_collection.updateOne({id:writing_id},{$set:{comment:comment}});

}

  res.status(200).json({success:true});
    }catch(err){
          console.error(err);
    res.status(500).json({success:false,message:"서버오류"});
    }
    
}

};