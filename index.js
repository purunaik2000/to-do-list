require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes/route');
const app = express();
const cors = require('cors');

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=> console.log('Connected with database...!'))
.catch((err)=> console.log(err.message));

app.use(express.json());
app.use(cors());
app.use('/', route);

app.listen(process.env.PORT || 3000, (err)=>{
    if(err) console.log(err.message);
    else console.log('Application is running...!');
})