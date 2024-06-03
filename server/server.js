const express =require('express');
const app =express();
const mongoose = require('mongoose');
const cors =require('cors');
//const usersmodel=require("./module/users.js")
//const  filmsmodel=require("./module/films.js")
const port=5555
 
app.use(cors());

   
const router = require('./router/users.js');
const routers= require('./router/films.js')
  
const url = 'mongodb://localhost:27017/databd';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 



// app.get("/", async (req,res)=>{
    
//    const users= await usersmodel.find();
//     res.json(users);
// });
// app.get("/films", async (req,res)=>{
    
//     const films= await filmsmodel.find();
//      res.json(films);
//  })




app.use('/api', router);  
app.use('/api',routers)
  
async function connectDb() {
    try {
        await mongoose.connect(url);
        console.log("Database connected");
    }   
    catch (error) {
        console.error("Failed to connect to database:", error);
    }
}

connectDb();




app.listen(port,()=>{
    console.log('app  listening at http://localhost:',port);
});