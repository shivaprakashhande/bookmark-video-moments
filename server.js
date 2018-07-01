const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path=require('path');
const port=8000;
const api=require('./src/api/api');

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',api);

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Headers', 'application/json');
})


app.get('*',(req,res)=>{res.sendFile(path.join(__dirname,'dist/index.html'))});

var server=app.listen(port,function(){
    console.log("server is running at port 8000");
})