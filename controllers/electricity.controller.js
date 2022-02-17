const Electricity = require("../models/electricity.model");
exports.getAll = async (req, res) => {
  try {
    let electricity = await Electricity.find();
    res.status(200).json(electricity);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.electricityId;
    let electricity = await Electricity.findOne({ _id: id });
    res.status(200).json(electricity);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewElectricity = async (req, res) => {
  try {
    const electricity = new electricity({
      amount: req.body.amount,
      meter: req.body.meter,
      token: req.body.token
    });

    let newElectricity = await Electricity.save();
    res.status(200).json({ data: newElectricity });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.deleteElectricity = async (req, res) => {
  try {
    const id = req.params.electricityId;
    let result = await Electricity.findOneAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};