const express = require('express');

const mongoose = require("mongoose");

let schemma = require('../models/books' );
  //const url ="mongodb+srv://creative:LoveStream12345@was500.ldcq6fb.mongodb.net/?retryWrites=true&w=majority";
  const username = "creative";
  const password = "LoveStream12345";
  const cluster = "was500.ldcq6fb";
  const dbname = "WAS-Assignment-5";
 
     // Connecting to database
     mongoose.connect( `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`).then((ans) => {
        console.log("Connected Successfully To MongoDB")
    }).catch((err) => {
        console.log("Error in the Connection")
    })
    
    // Calling Schema class
    const Schema = mongoose.Schema;
    
    // Creating Structure of the collection
    const collection_structure = new Schema(schemma );
    
    // Creating collection
const collections = mongoose.model("book", collection_structure );
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser'); 
let resultbooks=[];
const app=express();
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:false})); 

module.exports = {
  home:(req, res)=>{
      res.render( "../views/index.ejs");
  },
   
  books:(req, res)=>{
        
         var  query= collections.find({}); 
          query.exec(function (err, book) {
              if (err) return handleError(err); 
              console.log( book);
              //res.json(JSON.stringify(book));
              res.render( "../views/books.ejs" , {characters:book});
          });
       //console.log(collections);
        //res.render( "../views/books.ejs" , {toDoList:book});
  },
  admin:(req, res)=>{
        
      var  query= collections.find({}); 
       query.exec(function (err, book) {
           if (err) return handleError(err); 
           console.log( book);
           //res.json(JSON.stringify(book));
           res.render( "../views/admin.ejs" , {characters:book});
       });
    //console.log(collections);
     //res.render( "../views/books.ejs" , {toDoList:book});
  },
  edit:(req, res)=>{
        
      let id = [req.query.id || []].flat(); 
         var  query= collections.find({_id: id}); 
         query.exec(function (err, book) {
          if (err) return handleError(err);  
          res.render( "../views/edit.ejs" , {characters:book});
        }); 
  },
  saveedit:(req, res)=>{  
      
      let id = [req.query.id || []].flat().toString(); 
      let name = [req.query.name || []].flat().toString(); 
      let author_name = [req.query.author_name || []].flat().toString(); 
      let description = [req.query.description || []].flat().toString(); 
     
     let  edit= editerec(id ,name,author_name, description, collections);
     if( edit){
      
          res.redirect('/admin');
     }
  },
  delete:(req, res)=>{
    
      let id = [req.query.id || []].flat();  
      let del = deleterec(id ,collections );
      if(del){res.redirect('/admin');}
  },
  search_books:async (req, res)=>{ 
      let bname = [req.query.name || []].flat(); 
      //console.log(bname);
      var  query= collections.find({name: bname}); 
         query.exec(function (err, book) {
          if (err) return handleError(err); 
          console.log(book);
          res.render( "../views/search.ejs", {characters:book,bookname:bname});
        }); 
        //res.render( "../views/book.ejs" , {characters:''});
      
  },
  book:async (req, res)=>{ 
      let id = [req.query.id || []].flat(); 
         var  query= collections.find({_id: id}); 
         query.exec(function (err, book) {
          if (err) return handleError(err); 
          //console.log(book);
          res.render( "../views/book.ejs" , {characters:book});
        }); 
        
      
  },
  errorpage:async (req, res)=>{ 
       
          res.render( "../views/404.html"  );
         
  },
  insert:(req, res)=>{
          res.render( "../views/add.ejs");
  },
  saveadd:async (req,res)=>{

       
      let name = [req.query.name || []].flat().toString(); 
      let author_name = [req.query.author_name || []].flat().toString(); 
      let description = [req.query.description || []].flat().toString(); 
      try{
    
      const bookmode2 = new  collections({

          name:name,
          author_name:author_name,
          description:description,
          image:"book2.png",
      });
      const result2 = await  bookmode2.save();
      if(result2){
          res.redirect('/admin');
      }
  }catch(error){
     
     res.send(error.message);
  }

  }
}
async function deleterec(id , collections) {
  const query = { _id: id };
  const result = await collections.deleteOne(query);
  if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
       
  } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      
  }  
  return 1;
}
async function editerec(id ,name,author_name, description, collections) {
   
   
  const filter = { _id: id };
  const update = { name: name, author_name: author_name, description: description};
  let doc = await collections.findOneAndUpdate(filter, update, {
       new: true
  });
  return 1;
}