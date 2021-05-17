const YearOf = require("../models/year_of.model");
// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  // create new student
  const year_of = new YearOf({
    year_date: req.body. year_date,
    description: req.body.description,
    
   
  });
  if (req.session.AdminLogged) {
  // save question in the database
  YearOf.create(year_of, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the year.",
      });
    } else res.send({ message: "|year was created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  YearOf.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieve year.",
      });
    } else res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { streamId } = req.params;
  YearOf.findById(streamId, (err, data) => {
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

  const { streamId } = req.params;
  const stream = new Division(req.body);

  YearOf.updateById(streamId, stream, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${streamId}` })
        : res.status(500).send({
            message: `Could not update stream with id ${streamId}`,
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
  const { streamId } = req.params;

  YearOf.remove(streamId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${streamId}` })
        : res.status(500).send({
            message: `Could not delete stream with id ${streamId}`,
          });
    } else {
      res.send({ message: "stream  deleted successfully!" });
    }
  });
}
};
