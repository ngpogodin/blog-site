const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/index');
const mongoose = require('mongoose');


app.use(express.json());
app.use('/api', router);







const port = process.env.PORT || 3000;

async function start() {
    try{
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }).then(()=> {
            console.log('DB is successfuly connected!')
        });

        app.listen(port, () => {
        console.log(`Server started on ${port}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start()