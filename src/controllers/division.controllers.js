const Division = require("../models/division.model");
// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  // create new student
  const division = new Division({

    name: req.body.name,
    description: req.body.description,
    department_id: req.body.department_id,

  });
  // save question in the database
  if (req.session.AdminLogged) {
  Division.create(division, (err, data) => {
    if (err)
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the division.",
        });

    res.send({ message: "|Division was created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Division.getAll((err, data) => {
    if (err)
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while retrieve customers.",
        });

    res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { divisionId } = req.params;
  Division.findById(divisionId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found division with id ${divisionId}` })
        : res
            .status(500)
            .send({
              message: `Could not retrieve customer with id ${divisionId}`,
            });
    }

    res.send(data);
  });
}
};

// update a question identified by the customerId in the request


// update a question identified by the customerId in the request
exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { divisionId } = req.params;
  const division = new Division(req.body);

  Division.updateById(divisionId, division, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customer with id ${divisionId}` })
        : res
            .status(500)
            .send({
              message: `Could not update division with id ${divisionId}`,
            });
    }
   else{
       res.send({ message: "division was updated successfully!", data });
   }

  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { divisionId } = req.params;

  Division.remove(divisionId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found division with id ${divisionId}` })
        : res
            .status(500)
            .send({
              message: `Could not delete division with id ${divisionId}`,
            });
    }
    else{

        res.send({ message: "divison  deleted successfully!" });
    }

  });
}
};
