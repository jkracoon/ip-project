var validator = require("validator");

const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const scheduleRoute = Router();

const express = require("express");
scheduleRoute.use(express.static("public"));

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


const findSchedule=(data,activity,personality)=>{
   console.log(activity,personality)
   let schedule=[];
    data.forEach(item => {
      if(!schedule.includes(item.schedule) && item.activity===activity && item.personality===personality){
        schedule.push(item.date)
      }
    })
   let date=new Date(Number(schedule[0])).toLocaleDateString("en-US")
   return date
}

// Route 1: GET /schedule?activity=[activity name] => return a list schedule based on activity
scheduleRoute.get("/", (req, res) => {
 let data = readFile();
  let findschedule =findSchedule(data,req.query.activity,req.query.personality);
  res.status(200).json(findschedule);
});




module.exports = scheduleRoute;
