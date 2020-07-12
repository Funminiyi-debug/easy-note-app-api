const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}))

// parse request of content-type - application/json
app.use(bodyParser.json());

// configuring the database above the app.use bodyparser json
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//to connect to the database 
mongoose.connect(dbConfig.MongoDBURI, { 
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('yea yea, you connected the database successfully');
    })
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now....', err)
        process.exit();
    })

// setting the first application route    
app.get('/', (req, res) => {
    
    res.json({"message": "Welcome to my applications"})
    res.send('Yea, this should show on the page')
})

// require notes routes
require('./app/routes/notes.routes')(app)
// remember what we exported from the routes file is a function with a parameter of app

const PORT = 3500
//listen for request 
app.listen(PORT, () => {
    console.log('Server is working now on port:' , PORT)
})


