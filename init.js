const mongoose=require("mongoose");
const Chat=require("./models/chat");

main().then(()=>{//if main function succsefully called
    console.log("connection succesfull");
})
.catch((err)=>console.log(err));//if a error is gererated

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");//
}

let chats=[
    {    
            from:"Neha",
            to:"Priya",
            msg:"send me class notes in 2 hours",
            created_at: new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"send me class notes in 2 hours",
        created_at: new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"send me class notes in 2 hours",
        created_at: new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"send me class notes in 2 hours",
        created_at: new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"send me class notes in 2 hours",
        created_at: new Date(),
    },
    {
        from:"Neha",
        to:"Priya",
        msg:"send me class notes in 2 hours",
        created_at: new Date(),
    },

]

Chat.insertMany(chats);

