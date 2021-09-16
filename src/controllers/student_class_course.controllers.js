const StudentClass= require("../models/student_class_course.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  if (req.session.AdminLogged) {
  const student_class = new StudentClass({
    student_id: req.body.student_id,
    class_id: req.body.class_id,
    course_id: req.body.course_id,
    stream_id: req.body.stream_id,
  });
  
  StudentClass.create(student_class, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Student's Class created successfully!", data });
  });
}
};

exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  const { page } = req.params;
  const { countPerPage } = req.params;
  const { searchInput } = req.params;
  const { searchRequested } = req.params;

  console.log("search input is " + searchRequested);
  var myBoolean =
    searchRequested === undefined || searchRequested.toLowerCase() === "false"
      ? false
      : true;
  if (myBoolean) {
    StudentClass.search(page, countPerPage, searchInput, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieve dept.",
        });

      res.send(data);
    });

    
  } else {
    StudentClass.getAll(
      page,
      countPerPage,
      
      (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieve customers.",
          });

        res.send(data);
        
      }
    );
  }

  }
};
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { studentClassId } = req.params;
  StudentClass.findById(studentClassId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${studentClassId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${studentClassId}` });
    }

    res.send(data);
  });
}
};

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { studentId } = req.params;
  const student_class = new StudentClass(req.body);

  StudentClass.updateById(studentId, student_class, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${studentId}` })
        : res.status(500).send({ message: `Could not update customer with id ${studentId}` });
    }

    res.send({ message: "Students class  updated successfully!", data });
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { studentClassId } = req.params;

  StudentClass.remove(studentClassId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${studentClassId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${studentClassId}` });
    }

    res.send({ message: "Studnets class  deleted successfully!" });
  });
}
};
