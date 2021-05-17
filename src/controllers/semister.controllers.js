const Semister = require("../models/semister.model");
// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  // create new student
  const semister = new Semister({
    semister_no: req.body. semister_no,
    year_of_id: req.body.year_of_id,
   
  });
  if (req.session.AdminLogged) {
  // save question in the database
  Semister.create(semister, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the year.",
      });
    } else res.send({ message: "|Semister  created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Semister.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Semister.",
      });
    } else res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { semisterId } = req.params;
  Semister.findById(semisterId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found year with id ${streamId}` })
        : res.status(500).send({
            message: `Could not retrieve year with id ${streamId}`,
          });
    } else res.send(data);
  });
}
};

// update a question identified by the customerId in the request

// update a question identified by the customerId in the request
exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { semisterId } = req.params;
  const semister = new Division(req.body);

  Semister.updateById(semisterId, semister, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${semisterId}` })
        : res.status(500).send({
            message: `Could not update stream with id ${semisterId}`,
          });
    } else {
      res.send({ message: "stream was updated successfully!", data });
    }
  });
  }
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { semisterId } = req.params;

  Semister.remove(streamId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${semisterId}` })
        : res.status(500).send({
            message: `Could not delete stream with id ${semisterId}`,
          });
    } else {
      res.send({ message: "Semister  deleted successfully!" });
    }
  });
  }
};
