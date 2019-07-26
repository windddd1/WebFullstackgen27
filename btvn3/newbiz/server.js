const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));


app.get('/' , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/services.html'));
});

app.get('/services' , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/services.html'));
});

app.get('/about' , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/about.html'));
});

app.listen(3000, eror =>{
    if(eror){
        console.log(eror);
    } else {
        console.log('Server listen on port 3000...');
    }
});