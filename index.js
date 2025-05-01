const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const bodyparser = require("body-parser");
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')


const app = express();
const PORT = 4000;

dotEnv.config();


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));


app.use(bodyparser.json());


app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use('/uploadss', express.static('uploads'));





app.get("/home", (req, res) => {
  res.send("<h1>Welcome</h1>");
});


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
