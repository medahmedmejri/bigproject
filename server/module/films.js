const mongoose= require('mongoose');
const {Schema}=mongoose; 
const filmschema = new Schema ({
    title:String,
    rating:String,
    image:String,
    directed_by :String,
    film_type:String,
    actors:String
});

const film= mongoose.model('film',filmschema,'films');
module.exports={
    films:film,
}