var validator = require("validator");

const { Router } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const warehouseRoute = Router();

const express = require("express");
warehouseRoute.use(express.static("public"));

const readFile = () => {
  const wareHousesData = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(wareHousesData);
};

const writeFile = (wareHousesData) => {
  fs.writeFileSync(
    "./data/warehouses.json",
    JSON.stringify(wareHousesData, null, 2)
  );
};

// Route 1: GET /warehouses
warehouseRoute.get("/", (req, res) => {
  let data = readFile();
  res.status(200).json(data);
});

// Route 2: GET /warehouses/:warehouseId
warehouseRoute.get("/:warehouseId", (req, res) => {
  const warehouseData = readFile();
  const warehouse = warehouseData.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  if (!warehouse) {
    return res.status(404).send("The warehouse is not found");
  }

  return res.status(200).json(warehouse);
});

// Route 3: POST /warehouses
warehouseRoute.post("/", (req, res) => {
  // Establish warehouseData object
  const warehouseObject = readFile();

  if (req.body) {
    let data = req.body;
    console.log("Request body received...");

    if (
      data.name == undefined ||
      data.address == undefined ||
      data.city == undefined ||
      data.country == undefined ||
      data.contact == undefined
    ) {
      res
        .status(400)
        .send("Key missing from request body, please update and re-send.");
    } else {
      if (validator.isEmpty(data.name)) {
        res.status(400).send("Name empty, please update and re-send.");
      }
      if (validator.isEmpty(data.address)) {
        res.status(400).send("Address empty, please update and re-send.");
      }
      if (validator.isEmpty(data.city)) {
        res.status(400).send("City empty, please update and re-send.");
      }
      if (validator.isEmpty(data.country)) {
        res.status(400).send("Country empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.name)) {
        res.status(400).send("Contact name empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.position)) {
        res
          .status(400)
          .send("Contact position empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.phone)) {
        res.status(400).send("Contact phone empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.email)) {
        res.status(400).send("Contact email empty, please update and re-send.");
      }
      if (!validator.isEmail(data.contact.email)) {
        res.status(400).send("Email invalid!");
      } else {
        warehouseObject.push(data);

        writeFile(warehouseObject);

        res.status(200).send(warehouseObject);
      }
    }
  }
});

// Route 4: PUT /warehouses/:warehouseId
warehouseRoute.put("/:warehouseId", (req, res) => {
  const warehouseData = readFile();

  let warehouseToUpdate = warehouseData.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );
  warehouseToUpdate.id = req.params.warehouseId;
  console.log(warehouseToUpdate);

  if (req.body) {
    let data = req.body;

    if (
      data.name == undefined ||
      data.address == undefined ||
      data.city == undefined ||
      data.country == undefined ||
      data.contact.name == undefined ||
      data.contact.position == undefined ||
      data.contact.phone == undefined ||
      data.contact.email == undefined
    ) {
      res
        .status(400)
        .send("Key missing from request body, please update and re-send.");
    } else {
      if (validator.isEmpty(data.name)) {
        res.status(400).send("Name empty, please update and re-send.");
      }
      if (validator.isEmpty(data.address)) {
        res.status(400).send("Address empty, please update and re-send.");
      }
      if (validator.isEmpty(data.city)) {
        res.status(400).send("City empty, please update and re-send.");
      }
      if (validator.isEmpty(data.country)) {
        res.status(400).send("Country empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.name)) {
        res.status(400).send("Contact name empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.position)) {
        res
          .status(400)
          .send("Contact position empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.phone)) {
        res.status(400).send("Contact phone empty, please update and re-send.");
      }
      if (validator.isEmpty(data.contact.email)) {
        res.status(400).send("Contact email empty, please update and re-send.");
      }
      if (!validator.isEmail(data.contact.email)) {
        res.status(400).send("Email invalid!");
      } else {
        warehouseToUpdate.id = req.params.warehouseId;
        warehouseToUpdate.name = req.body.name;
        warehouseToUpdate.address = req.body.address;
        warehouseToUpdate.city = req.body.city;
        warehouseToUpdate.country = req.body.country;

        warehouseToUpdate.contact.name = req.body.contact.name;
        warehouseToUpdate.contact.position = req.body.contact.position;
        warehouseToUpdate.contact.phone = req.body.contact.phone;
        warehouseToUpdate.contact.email = req.body.contact.email;

        writeFile(warehouseData);
        res.status(200).json(warehouseToUpdate);
      }
    }
  }
});

// Route 5: DELETE /warehouses/:warehouseId
warehouseRoute.delete("/:warehouseId", (req, res) => {
  const warehouseData = readFile();
  const warehouse = warehouseData.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  if (!warehouse) {
    return res.status(404).send("The warehouse is not found");
  } else {
    let updatedWarehouseData = warehouseData.filter(
      (warehouse) => warehouse.id !== req.params.warehouseId
    );
    writeFile(updatedWarehouseData);
    return res.status(200).json(warehouse);
  }
});

module.exports = warehouseRoute;
