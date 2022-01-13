const express = require("express");
const cors = require("cors");
const warehouseRoute = require("./routes/warehouse");
const inventoryRoute = require("./routes/inventory");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/warehouses", warehouseRoute);
app.use("/inventories", inventoryRoute);

app.listen(PORT, () => console.log(`🚀 server listening on port ${PORT}`));
