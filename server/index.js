require("dotenv").config();
const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./Routes/payment");
const status = require("./Routes/status") ; 
const app = express();
const db = require("./db")
db(); 

app.use(express.json());
app.use(cors());

app.use("/api/payment/", paymentRoutes);
app.use("/api/status" , status) ; 

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
