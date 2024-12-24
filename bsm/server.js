const express = require('express')
const ConnectDb = require('./config/db')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
const port = 4000
dotenv.config()
ConnectDb()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',require('./routes/indexRoutes'))
app.listen(port,(err)=>{
    if(err) console.log(err)
    console.log(`Server Running On The Port = ${port}`);
})