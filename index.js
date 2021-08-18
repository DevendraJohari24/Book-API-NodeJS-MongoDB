const express = require("express");
const OurApp = express();

OurApp.get("/",(request, response)=>{
    response.json({
        message: "Request Sent!!!",
    });
});

OurApp.listen(4000,()=>{
    console.log("Server is running!!");
});