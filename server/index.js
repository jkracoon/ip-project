const express = require("express");
const cors = require("cors");
const activityRoute = require("./routes/activity");
const personalityRoute = require("./routes/personality");
const scheduleRoute = require("./routes/schedule");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/activity", activityRoute);
app.use("/personality", personalityRoute);
app.use("/schedule", scheduleRoute);


app.listen(PORT, () => console.log(`🚀 server listening on port ${PORT}`));
