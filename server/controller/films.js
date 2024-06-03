const {films}=require('../module/films.js');

const getfilms = async(req,res)=>{
    try{
          const foundfilms= await films.find();
          res.status(200).json(foundfilms);
    }
    catch(error){
        console.error('error in get  users',error);
        res.status(500)
    }
}
  
const getonefilm= async(req,res)=>{
    try{
  const  onefilm= await films.findById(req.params.id).exec();
  res.status(200).json( onefilm);
    }
    catch(error){
        console.error('error in get  film',error);
        res.status(500);

    }
}

const postfilm = async(req,res)=>{
    const {title,rating,image,directed_by,film_type,actors}=req.body;
    const newuser = await films({
        title,
        rating,
        image,
        directed_by,
        film_type,
        actors
    });
    try{
const postfilm = await newuser.save();
res.status(200).json({
    success: true ,postfilm})
    console.log("working")
    }
    catch(error){
        console.error('error in post  films',error);
        res.status(501);
    }
};
const delatefilm = async(req,res)=>{
    try{
         const userId = req.params.id;
    const delateone= await films.findByIdAndDelete(userId);
    if(!delateone){
        return res.status(404).json({
            message : 'User not found'
        })
    };
    res.json({
        message : 'User deleted',film : delateone})
    
    }
   catch(error){
    console.error('error in delte  users',error);
    res.status(505);
}
}

const editfilm = async(req,res)=>{
    try{
        const userId = req.params.id;
        const update = req.body;
        const updateUser = await films.findByIdAndUpdate(userId,update,{new:true });
        if(!updateUser){
            return res.status(404).json({
                message : 'film not found'
            })
        }
        res.json({
            message : 'film  updated sucssessefly',users: updateUser
        })
    }
    catch(error){
        console.error('error in delte  users',error);
        res.status(505);
    }
}


       
module.exports={getfilms,postfilm, getonefilm,delatefilm,editfilm }