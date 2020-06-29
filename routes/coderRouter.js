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
    if(req.body._id =='')
    {
        insertData(req,res);
    }
    else{
        updateRecord(req,res);
    }
});
function insertData(req,res){
    var coder = new Coder();
    coder.name = req.body.name;
    coder.email = req.body.email;
    coder.mobile = req.body.mobile;
    coder.city = req.body.city;

    //saving the coder information
    if(coder.name =='' || coder.email=='' || coder.mobile =="" || coder.city== "")
    {
        res.status(200).render('coders/addOrEditCoder.hbs',({
            viewTitle:'Insert a Coder',
            error:"Enter all the details",
            coder:res.body
        }));
        return;
        
    }

    coder.save((err,dox)=>{
        if(!err)
        {   res.redirect('/coder/info')
            console.log('Data is save sucessfully to the mongodb');
        }
        else{
            if(err.name =='ValidationError')
            {
                handleValidationError(err,req.body)
                res.status(200).render('coders/addOrEditCoder.hbs',{
                    viewTitle:'Insert Coder',
                    coder:req.body
                })
            }
            console.log('Some error in saving the data '+ err);
        }

    });


}


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
coderRouter.get('/:id',(req,res)=>{
    Coder.findById(req.params.id,(err,dox)=>{
        res.status(200).render('coders/addOrEditCoder.hbs',{
            viewTitle:'Update Coder',
            coder:dox
        });
    });
});

function handleValidationError(err,body)
{
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name':
                body['nameError']=err.errors[field].message;
                break;
    
           case 'email':

                body['emailError']=err.errors[field].message;
                break;
            default:
                break;

        }
    }
}

function updateRecord(req,res){
    Coder.findOneAndUpdate({id:req.body._id},req.body,{new:true},(err,dox)=>{
        if(!err)
        {
            res.redirect('/coders/info');
        }
        else{
            if(err.name == 'ValidationError')
            {
                handleValidationError(err,req.body);
                res.render('coders/addOrEditCoder.hbs',({
                    viewTitle:'Update Coder',
                    coder:req.body
                }))
            }
            else{
                console.log("Error occured in updating the coder id"+ err)
            }
        }
    })
}














module.exports = coderRouter;
