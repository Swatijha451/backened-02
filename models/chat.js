const mongoose=require("mongoose");
const chatSchema=new mongoose.Schema({
    from :{
        type:String,
        recquired:true
    },
    to:{
        type:String,
        recquired:true
    },
    msg:{
        type:String,
        maxLength:100,
    },
    created_at:{
        type:Date,
        recquired:true
    }
});
const Chat=mongoose.model("Chat",chatSchema);

module.exports=Chat;