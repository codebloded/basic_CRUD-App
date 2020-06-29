const mongoose = require('mongoose');
const validator = require('email-validator')

const coderSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:'must enter the email '
    },
    mobile:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    }
});


coderSchema.path('email').validate((val)=>{
    return validator.validate(val);
},"Invalid Email")



let Coder = mongoose.model('Coder',coderSchema);

module.exports = Coder;
