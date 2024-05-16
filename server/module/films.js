const mongoose= require('mongoose');
const {Schema}=mongoose; 
const filmschema = new Schema ({
    title:String,
    rating:String,
    image:String
});

const film= mongoose.model('film',filmschema,'films');
module.exports={
    films:film,
}