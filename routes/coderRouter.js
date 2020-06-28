const express = require('express');
const Coder = require('../models/coderSchema');
const { Router } = require('express');
const coderRouter = express.Router();

coderRouter.get('/',(req,res)=>{
    res.status(200).render('coders/addOrEditCoder.hbs',{
        viewTitle:'Insert a Coder here'
    });
});

coderRouter.post('/',(req,res)=>{
    var coder = new Coder();
    coder.name = req.body.name;
    coder.email = req.body.email;
    coder.mobile = req.body.mobile;
    coder.city = req.body.city;

    //saving the coder information
    coder.save((err,dox)=>{
        if(!err)
        {   res.redirect('/coder/info')
            console.log('Data is save sucessfully to the mongodb');
        }
        else{
            console.log('Some error in saving the data '+ err);
        }

    });


})

//creating a route for displaying the infomation about the coders 
coderRouter.get('/info',(req,res)=>{
    Coder.find((err,dox)=>{
        if(!err){

            res.status(200).render('coders/coderInfo.hbs',{
                info:dox
            })
        } 
    })
})

















module.exports = coderRouter;
