//1
require('dotenv').config();


//2
const express = require('express');
const cors = require('cors');


//8
require('./DB/connection');


//9
const routes = require('./Routes/router');


//3. create a backend using express
const ecartServer = express();


//4
ecartServer.use(cors());
ecartServer.use(express.json());
//10
ecartServer.use(routes);


//5
const PORT = 3000 || process.env.PORT;


//6
ecartServer.listen(PORT,()=>{
    console.log("ecart server listening on port"+PORT);
})


//7
ecartServer.get('/',(req,res)=>{
    res.send('ecart server started...');
})


 