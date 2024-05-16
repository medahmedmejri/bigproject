const{users}=require('../module/users.js');

const getusers = async(req,res)=>{
    try{
          const foundUsers= await users.find();
          res.status(200).json(foundUsers);
    }
    catch(error){
        console.error('error in get  users',error);
        res.status(500)
    }
}

const getoneuser= async(req,res)=>{
    try{
  const  oneuser= await users.findById(req.params.id).exec();
  res.status(200).json(oneuser);
    }
    catch(error){
        console.error('error in get  users',error);
        res.status(500);

    }
}

const postuser = async(req,res)=>{
    const {name,age,Email}=req.body;
    const newuser = await users({
        name,
        age,
        Email
    });
    try{
const postuser = await newuser.save();
res.status(200).json({
    success: true ,postuser})
    console.log("working")
    }
    catch(error){
        console.error('error in post  users',error);
        res.status(501);
    }
};

const delateuser = async(req,res)=>{
    try{
         const userId = req.params.id;
    const delateone= await users.findByIdAndDelete(userId);
    if(!delateone){
        return res.status(404).json({
            message : 'User not found'
        })
    };
    res.json({
        message : 'User deleted',user : delateone})
    
    }
   catch(error){
    console.error('error in delte  users',error);
    res.status(505);
}
}

const editUser = async(req,res)=>{
    try{
        const userId = req.params.id;
        const update = req.body;
        const updateUser = await users.findByIdAndUpdate(userId,update,{new:true });
        if(!updateUser){
            return res.status(404).json({
                message : 'User not found'
            })
        }
        res.json({
            message : 'user  updated sucssessefly',users: updateUser
        })
    }
    catch(error){
        console.error('error in delte  users',error);
        res.status(505);
    }
}




      
       
module.exports={getusers,getoneuser,postuser,delateuser,editUser}
