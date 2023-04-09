const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://ananth:ananth@cluster0.8tqmpj8.mongodb.net/test")
.then(()=>{
    console.log('mongoose connected');
})
.catch(()=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }, 
    birth_year:{
        type:String,
        required:true
    }, 
    allergies:{
        type:String,
        required:true
    }, 
    medications:{
        type:String,
        required:true
    }

})

const LogInCollection=new mongoose.model('ANANTH',logInSchema)

module.exports=LogInCollection