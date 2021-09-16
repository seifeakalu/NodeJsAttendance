const Division = require("../models/division.model");
exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  const division = new Division({

    name: req.body.name,
    description: req.body.description,
    department_id: req.body.department_id,

  });
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

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { divisionId } = req.params;
  Division.findById(divisionId, (err, data) => {
    if (err) {
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

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { divisionId } = req.params;
  const division = new Division(req.body);

  Division.updateById(divisionId, division, (err, data) => {
    if (err) {
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

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { divisionId } = req.params;

  Division.remove(divisionId, (err) => {
    if (err) {
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
