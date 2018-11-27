const express = require('express')
const router = express.Router()
const Image = require('../models/images')
const fs = require('fs')
const mongoose = require('mongoose')
const upload = require('../multer/storage')

router.route('/')
    .get((req,res)=>{
        Image.find({},(err,images)=>{
            if(err)throw err
            res.render('images',{images:images})
        })
    })
    .post((req, res, next)=>{
        upload(req, res, function (err) {
            // need to check if the req.file is set.
            if(req.file == null || req.file == undefined || req.file == ""){
                //redirect to the same url            
                res.send(err)
                
            }else{
                // An error occurred when uploading
                if (err) {
                    console.log(err);
                }else{
                    // Everything went fine
                    //define what to do with the params
                    //both the req.body and req.file(s) are accessble here
                    console.log(req.file);
            
            
                    //store the file name to mongodb    
                    //we use the model to store the file.
                    let image = new Image();
                    image.title = req.body.title
                    image.desc = req.body.desc
                    image.tags = req.body.tags
                    image.image = req.file.filename;
            
                    
            
                    //save the image
                    image.save(()=>{
                        if(err){
                            console.log(err);
                        }else{
                            //render the view again    
                            res.redirect("/uploads");
            
                        }
                    });
    
                }
        
            }
    
    }); 
        //let multer manage the requests
        //which are passed to the upload function
        //by the main request.
        //the function if everything went right
        //will upload the file without cheking if already exists
    
        
    
        // ---------- MULTER UPLOAD FUNCTION -------------
        
  
    })

router.route('/:id')
    .delete((req,res)=>{
        let _id = req.params.id
        Image.findByIdAndDelete(_id,(err,image)=>{
            if(err) throw err
            console.log(image)
            res.send('Image delete' + image).status(202)
        })
    })

module.exports = router