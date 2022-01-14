var validator = require("validator");

const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const personalityRoute = Router();

const express = require("express");
personalityRoute.use(express.static("public"));

const readFile = () => {
  const data = fs.readFileSync("./data/data.json");
  return JSON.parse(data);
};

const writeFile = (data) => {
  fs.writeFileSync(
    "./data/data.json",
    JSON.stringify(data, null, 2)
  );
};


const uniquePersonality=(data,activity)=>{
   let personalities=[];
   if(activity){
     console.log(activity)
      data.forEach(item => {
        if(!personalities.includes(item.personality) && item.activity===activity){
          personalities.push(item.personality)
        }
      })
   }
   else{ 
     data.forEach(item => {
        if(!personalities.includes(item.personality)){
          personalities.push(item.personality)
        }
      })
  };
   return personalities
}

// Route 1: GET /personality?activity=[activity name] => return a list personality based on activity
personalityRoute.get("/", (req, res) => {
 let data = readFile();
 
 if(req.query.activity===undefined){
    let personalities =uniquePersonality(data,"");
    res.status(200).json(personalities);
  }
  else{
    let findPersonality =uniquePersonality(data,req.query.activity);
     res.status(200).json(findPersonality);
  }
});




module.exports = personalityRoute;
