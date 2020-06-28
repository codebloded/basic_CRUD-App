const mongoose = require('mongoose');

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

let Coder = mongoose.model('Coder',coderSchema);

module.exports = Coder;
