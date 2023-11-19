const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const json = require("JSON");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function( req , res ){
    res.sendFile(__dirname + ("/index.html"));
});



app.listen(3000 , function( res , req ) {
    console.log("Server live at port 3000");
});