const express=require('express');
const path= require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



var contactList=[
    {
        name:"harshit",
        phone:"1111111111"
    },
    {
        name:"tony",
        phone:"2222222222"
    },
    {
        name:"undertaker",
        phone:"3333333333"
    }

]

app.get('/',function(req,res){
   Contact.find({},function(err,contacts){
       if(err){
           console.log('error in fetching');
           return;
       }
   
    return res.render('home',{
        title:"contact list  ",
        contact_list:contacts
    });
});
});

app.get('/practice',function(req,res){
    
    return res.render('practice',{title:"let us play with ejs"});
});

app.post('/create-contact',function(req,res){
    
//    contactList.push({
//        name:req.body.name,
//        phone:req.body.phone
//    });
// contactList.push(req.body);
//    return res.redirect('/');
Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
    if(err)
    {
        console.log('error');
        return;
    }
    console.log('****New Contact****');
return res.redirect('back');
});
});

// for deleting the contact 

app.get('/delete-contact',function(req,res){
    // get the id from the query in url
    
    let id=req.query.id;
    // find the contact in the database using id and delete it
   Contact.findByIdAndDelete(id,function(err){
       if(err){
           console.log('error in deleting');
           return;
       }
       return res.redirect('back');
   });

});


app.listen(port,function(err){
    if(err)
    {
        console.log('error',err);
    }
    console.log('express server running',port);
});