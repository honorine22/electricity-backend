const Electricity = require("../models/electricity.model");
exports.getAll = async (req, res) => {
  try {
    let electricity = await Electricity.find();
    res.status(200).json({ message: "bills retrieved successfully!", data: electricity });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.electricityId;
    let electricity = await Electricity.findOne({ _id: id });
    res.status(200).json({ message: "bill successfully retrieved!", electricity });
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
    res.status(200).json({ message: "bill successfully added!", newElectricity });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.deleteElectricity = async (req, res) => {
  try {
    const id = req.params.electricityId;
    let result = await Electricity.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "bill successfully deleted!", data: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT /bill/:id to updatea a bill given its id.

exports.updateBill = (req, res) => {
  const id = req.params.billId
  Bill.findByIdAndUpdate(id, {
    title: req.body.title,
    name: req.body.name,
    token: req.body.token,
  }, { new: true }).then((updatedBill) => {
    if (!updatedBill) {
      return res.status(404).json({
        message: "bill not found with id " + req.params.billId,
      });
    }
    res.status(200).send({ message: "bill updated!", updatupdatedBilledbill })
  }).catch((err) => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "bill not found with id " + req.params.billId,
      });
    }
    return res.status(500).send({
      message: "Error updating bill with id " + req.params.billId,
    });
  })
}