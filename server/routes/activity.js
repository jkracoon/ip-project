var validator = require("validator");

const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const activityRoute = Router();

const express = require("express");
activityRoute.use(express.static("public"));

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


const uniqueActivity=(data)=>{
   let activities=[];
   data.forEach(item => {
      if(!activities.includes(item.activity)){
        activities.push(item.activity)
      }
   });
   return activities
}

// Route 1: GET /activity   => return a list of all available activity
activityRoute.get("/", (req, res) => {
  let data = readFile();
  res.status(200).json(uniqueActivity(data));
});








// Route 2: GET /activity?personality => return a list of all personality based on activity choosen
activityRoute.get("/personality", (req, res) => {
  const warehouseData = readFile();
  const warehouse = warehouseData.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  if (!warehouse) {
    return res.status(404).send("The warehouse is not found");
  }

  return res.status(200).json(warehouse);
});

// Route 3: GET /activity/personality/date
activityRoute.get("/personality/schedule", (req, res) => {
  const warehouseData = readFile();
  const warehouse = warehouseData.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  if (!warehouse) {
    return res.status(404).send("The warehouse is not found");
  }

  return res.status(200).json(warehouse);
});





module.exports = activityRoute;
