const Class= require("../models/class.model");


exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  const classes = new Class({
    room_no: req.body.room_no,
   
  });
  if (req.session.AdminLogged) {
  Class.create(classes, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Class created successfully!", data });
  });
}
};
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Class.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { classId } = req.params;
  Class.findById(classId, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${questionId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${questionId}` });
    }

    res.send(data);
  });
}
};

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { classId } = req.params;
  const question = new Customer(req.body);

  Class.updateById(classId, question, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classId}` })
        : res.status(500).send({ message: `Could not update customer with id ${classId}` });
    }

    res.send({ message: "Question was updating successfully!", data });
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { classId } = req.params;

  Class.remove(classId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${classId}` });
    }

    res.send({ message: "Question was deleted successfully!" });
  });
}
};
