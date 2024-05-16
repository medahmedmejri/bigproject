const  router =require("express");
const {getfilms,getonefilm,postfilm,delatefilm,editfilm }= require('../controller/films.js');
const routers=router();

routers.get("/films",getfilms);
routers.get("/films/:id",getonefilm);
routers.post("/films",postfilm);
routers.delete("/films/:id",delatefilm );
routers.put("/films/:id",editfilm)

module.exports=routers