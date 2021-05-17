const InsClass= require("../models/instructor_classes_course.model");

// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new question
  const ins_class = new InsClass({
    instructor_id: req.body.instructor_id,
    class_id: req.body.class_id,
    course_id: req.body.course_id,
    stream_id: req.body.stream_id,
  });
  if (req.session.AdminLogged) {
  // save question in the database
  InsClass.create(ins_class, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Instructor's Class created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  InsClass.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { insClassId } = req.params;
  InsClass.findById(insClassId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${insClassId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${insClassId}` });
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

  const { InsClassId } = req.params;
  const ins_class = new InsClass(req.body);

  InsClass.updateById(insClassId, ins_class, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${insClassId}` })
        : res.status(500).send({ message: `Could not update customer with id ${insClassId}` });
    }

    res.send({ message: "Instructors class  updated successfully!", data });
  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { InsClassId } = req.params;

  InsClass.remove(insClassId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${insClassId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${insClassId}` });
    }

    res.send({ message: "instructor class  deleted successfully!" });
  });
}
};
