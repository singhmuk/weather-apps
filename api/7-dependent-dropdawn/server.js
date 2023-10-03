const express = require("express");
require("dotenv").config();
const dbCon = require("./config/db");
const countryRoutes = require("./routes/countries");
const stateRoutes = require("./routes/state");
const cityRoutes = require("./routes/city");
const saveValues = require("./routes/save");

const app = express();
dbCon;
app.use(express.json());

app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/saveData", saveValues);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
