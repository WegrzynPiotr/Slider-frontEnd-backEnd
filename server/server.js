const express = require('express');
const fs = require("fs");
const PORT = process.env.PORT ||3000;
const app = express();
const images = []
const cors = require("cors")
const bodyParser = require('body-parser');
app.use(cors());

app.use(express.static('public')); 
app.use('/images', express.static('images'));

fs.readdir("./public/images",(err,files)=>{
    if(files.length === 0){
       console.log("No files") 
       return;
    } else console.log("files found")
    files.forEach((file,index)=>{
        const src = file;
        const alt = file.slice(0,file.indexOf(".")) + " image";
        images.push({src, alt})
    })
})
app.get("/",(req,res)=>{
    res.json(images)
    })

app.listen(PORT,()=>{
    console.log("Nasłuchuje PORT: " + PORT)
})