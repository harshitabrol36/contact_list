// require lib
const mongoose=require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection to chk success
const db = mongoose.connection;

// error
db.on('error',console.error.bind('error connecting to db'));

// up and running thn print the message
db.once('open',function(){
    console.log('succesfully connected');
});