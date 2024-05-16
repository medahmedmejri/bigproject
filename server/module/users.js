const mongoose=require('mongoose');
const {Schema}=mongoose;
const userschema= new Schema ({
    name:String,
    age:Number,
    Email:String
});


const user=mongoose.model('user',userschema,'users')
module.exports={
    users:user,
}