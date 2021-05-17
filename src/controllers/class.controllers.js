const Class= require("../models/class.model");

// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new question
  const classes = new Class({
    room_no: req.body.room_no,
   
  });
  if (req.session.AdminLogged) {
  // save question in the database
  Class.create(classes, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Class created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Class.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { classId } = req.params;
  Class.findById(classId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${questionId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${questionId}` });
    }

    res.send(data);
  });
}
};

// update a question identified by the customerId in the request
exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { classId } = req.params;
  const question = new Customer(req.body);

  Class.updateById(classId, question, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classId}` })
        : res.status(500).send({ message: `Could not update customer with id ${classId}` });
    }

    res.send({ message: "Question was updating successfully!", data });
  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { classId } = req.params;

  Class.remove(classId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${classId}` });
    }

    res.send({ message: "Question was deleted successfully!" });
  });
}
};
