const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const inventoryRoute = Router();

const express = require("express");
inventoryRoute.use(express.static("public"));

const readFile = () => {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  return JSON.parse(inventoryData);
};

const writeFile = (inventoryData) => {
  fs.writeFileSync(
    "./data/inventories.json",
    JSON.stringify(inventoryData, null, 2)
  );
};


// Route 1: GET /inventories
inventoryRoute.get("/", (req, res) => {
  if(req.query.warehouseID===undefined){
    let data = readFile();
    res.status(200).json(data);
  }
  else{
    const inventoryData = readFile();
    let findInventory=inventoryData.filter(inventory=>inventory.warehouseID===req.query.warehouseID)
    writeFile(findInventory);
    res.status(200).json(findInventory)
  }
});

// Route 2: GET /inventories/:inventoryId
inventoryRoute.get("/:inventoryId", (req, res) => {
  const inventoryData = readFile();
  const inventory = inventoryData.find(
    (inventory) => inventory.id === req.params.inventoryId
  );

  if (!inventory) {
    return res.status(404).send("The inventory is not found");
  }

  return res.status(200).json(inventory);
});

// Route 3: POST /inventories/add
inventoryRoute.post("/add", (req, res) => {
  const inventoryData = readFile();

  // Validation
  if (
    !req.body.warehouseName ||
    !req.body.itemName ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).send("Please make sure to include all the data");
  }

  const newInventory = {
    id: uuid(),
    warehouseID: 1, // should be auto-generated depends on warehouseName - will configure it in front-end dropdown menu and then go back to revise this part
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };

  inventoryData.push(newInventory);
  writeFile(inventoryData);

  res.status(200).json(newInventory);
});

// Route 4: PUT /inventories/:inventoryID/edit
inventoryRoute.put("/:inventoryID/edit", (req, res) => {
  const inventoryData = readFile();

  let inventoryToUpdate = inventoryData.find(
    (inventory) => inventory.id === req.params.inventoryId
  );

  inventoryToUpdate.warehouseID = req.body.warehouseID;
  inventoryToUpdate.warehouseName = req.body.warehouseName;
  inventoryToUpdate.itemName = req.body.itemName;
  inventoryToUpdate.description = req.body.description;
  inventoryToUpdate.category = req.body.category;
  inventoryToUpdate.status = req.body.status;
  inventoryToUpdate.quantity = req.body.quantity;

  writeFile(inventoryData);
  res.status(200).json(inventoryToUpdate);
});

// Route 5: DELETE /inventories/:inventoryId
inventoryRoute.delete("/:inventoryId", (req, res) => {
  const inventoryData = readFile();
  let inventoryToDelete = inventoryData.find(
    inventory => inventory.id === req.params.inventoryId
  );

  if(!inventoryToDelete){
    res.status(404).send("The inventory is not found");
  }
  else
  {
    let updatedInventory=inventoryData.filter(inventory=>inventory.id!==req.params.inventoryId)
    writeFile(updatedInventory);
    res.status(200).json(inventoryToDelete)
  }
});



module.exports = inventoryRoute;
