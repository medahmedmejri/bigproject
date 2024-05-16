const  {Router}=require('express');
const {getusers,postuser,delateuser,editUser,getoneuser}=require('../controller/users.js');
const router=Router();
       
router.get("/users",getusers);
router.get("/users/:id",getoneuser)
router.post("/users",postuser);
router.delete("/users/:id",delateuser);
router.put("/users/:id",editUser)
module.exports=router