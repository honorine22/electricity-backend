let mongoose = require("mongoose");
let electricitySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    meter: {
        type: Number,
        required: true,
        maxlength: 6
    },
    token: {
        type: String,
        required: true,
        maxlength: 8
    }
});

let Electricity = mongoose.model("Electricity", electricitySchema);
module.exports = Electricity;