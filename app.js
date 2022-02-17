const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const electricityRoutes = require("./routes/electricityRoutes");
const { database } = require("./config/db");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE,PUT, OPTIONS"
    );
    next();
});
//configure database and mongoose
mongoose
    .connect(database, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((err) => {
        console.log("Connection Failed!", { database_error: err });
    });

app.use(cors({}));
//configure body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
app.use("/electricity", electricityRoutes);
// define first route
app.get("/", (req, res) => {
    res.json("Buy Your Electricity Token");
});

module.exports = app;