const mongoose=require("mongoose");
const path=require("path");
const express=require("express");
const Chat=require("./models/chat")
const methodOverride=require("method-override");

const app=express();
//to use ejs file views folder
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
//for using styles.css from public folder
app.use(express.static(path.join(__dirname,"public")));
//to parse the data that comes from url
app.use(express.urlencoded({extended:true}));
//to use method override
app.use(methodOverride('_method'));

main().then(()=>{//if main function succsefully called
    console.log("connection succesfull");
})
.catch((err)=>console.log(err));//if a error is gererated

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");//
}

let chat1= new Chat({
    from:"Neha",
    to:"Priya",
    msg:"send me class notes in 2 hours",
    created_at: new Date(),
})
chat1.save().then((res)=>{
    console.log(res);
});


app.get("/",(req,res)=>{
    res.send("root s working")
});

app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    console.log("chats");
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("form.ejs");
});
app.post("/chats",(req,res)=>{
let{from,to,msg}=req.body;
let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
})
newChat.save().then((res)=>{
    console.log("chat was saved");
}).catch((err)=>{
    console.log(err);
});
res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
   res.render("editForm.ejs",{chat});
});
app.put("/chats/:id",async (req,res)=>{
    let{ id }=req.params;
    let {msg:newMsg}=req.body;
    let updateChat= await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators:true,new:true},
    )
    console.log(updateChat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats"); 
})

app.listen(8080,()=>{
    console.log("srever is listening propperly");
});