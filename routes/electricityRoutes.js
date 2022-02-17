const express = require("express");
const router = express.Router();
const electricityController = require("../controllers/electricity.controller");
router.get("/", electricityController.getAll);
router.get("/:billId", electricityController.getById);
router.post("/", electricityController.addNewElectricity);
router.delete("/:billId", electricityController.deleteElectricity);

module.exports = router;