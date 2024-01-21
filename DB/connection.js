const mongoose = require('mongoose');   //connection of mongodb and node
const connection_string = process.env.CONNECTION_STRING;    //connection of CONNECTION_STRING and node

mongoose.connect(connection_string).then((res)=>{
    console.log('Ecart is connected to mongodb.');
}).catch ((err)=>{
    console.log('Error connection to mongodb.' +err.message);
})



