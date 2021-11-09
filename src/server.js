'use strict'
const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config()

//authRoutes
const authRoutes = require('./auth/route');

//require errors handlers
const notFoundError=require('./error-handlers/404')
const errorHandler =require('./error-handlers/500')

//main middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//bad route
app.get('/bad',(req,res)=>{
   throw new Error("error test")
})

//test server
app.get('/',(req,res)=>{
res.status(200).json({
    message: 'all thing is good'
    })
})

//Errors middlewares
app.use(authRoutes)
app.use('*',notFoundError)
app.use(errorHandler )

function start(){
    app.listen(process.env.PORT,()=>{
        console.log(`server is up on PORT ${process.env.PORT}`);
    })
}

module.exports={
    app,
    start
}