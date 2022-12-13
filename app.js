const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Customer = require('./models/customer');
const Batch = require('./models/batch')
const Fees = require('./models/Fees')

const connection_string = 'mongodb+srv://aryan:aryan123@cluster0.kvntc.mongodb.net/yoga?retryWrites=true&w=majority';
mongoose.connect(connection_string, { useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => console.log("Connected to Atlas Database Successfully !!!"))
    .catch( (err) => console.log("Error : ", err));

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('Landing Page');
});

app.use('/api', require('./routes/route'));

const port = 3000
app.listen(process.env.PORT || port, (req, res) => {
    console.log(`Listening On port ${port}`);
});