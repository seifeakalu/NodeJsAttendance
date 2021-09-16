const InsClass= require("../models/instructor_classes_course.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const ins_class = new InsClass({
    instructor_id: req.body.instructor_id,
    class_id: req.body.class_id,
    course_id: req.body.course_id,
    stream_id: req.body.stream_id,
  });
  if (req.session.AdminLogged) {
  InsClass.create(ins_class, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Instructor's Class created successfully!", data });
  });
}
};

exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  InsClass.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { insClassId } = req.params;
  InsClass.findById(insClassId, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${insClassId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${insClassId}` });
    }

    res.send(data);
  });
}
};

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { InsClassId } = req.params;
  const ins_class = new InsClass(req.body);

  InsClass.updateById(insClassId, ins_class, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${insClassId}` })
        : res.status(500).send({ message: `Could not update customer with id ${insClassId}` });
    }

    res.send({ message: "Instructors class  updated successfully!", data });
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { InsClassId } = req.params;

  InsClass.remove(insClassId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${insClassId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${insClassId}` });
    }

    res.send({ message: "instructor class  deleted successfully!" });
  });
}
};
