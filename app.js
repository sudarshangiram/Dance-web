const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser  = require("body-parser");
// using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

//Defining Schema For Data Base
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//Endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This items has been saved to data Base")
    }).catch(()=>{
        res.status(400).send("Item was not saved to data base")
    })
    
})
 

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});