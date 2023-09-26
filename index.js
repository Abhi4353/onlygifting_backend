const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();
const port = 8000;
const dbString = require("./dbconnection/connection");
const userRoute = require("./routes/userRoute")


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(userRoute)
app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});