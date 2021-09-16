
const ClassCourse= require("../models/class_course.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const class_course = new ClassCourse({
    instructor_id: req.body.instructor_id,
    class_id: req.body.class_id,
    course_id: req.body.course_id,
    stream_id: req.body.stream_id,
  });

  if (req.session.AdminLogged) {
  ClassCourse.create(class_course, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Class Course." });
    else
    res.send({ message: "Class Course created successfully!", data });
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
    ClassCourse.search(page, countPerPage, searchInput, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieve dept.",
        });

      res.send(data);
    });

    
  } else {
    ClassCourse.getAll(
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
  const { classCourseId } = req.params;
  ClassCourse.findById(classCourseId, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${classCourseId}` });
    }

    res.send(data);
  });
}
};

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { classCourseId } = req.params;
  const class_course = new ClassCourse(req.body);

  ClassCourse.updateById(classCourseId, class_course, (err, data) => {
    if (err) {

      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not update customer with id ${classCourseId}` });
    }

    res.send({ message: "Class Course  updated successfully!", data });
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { classCourseId } = req.params;

  ClassCourse.remove(classCourseId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found class course with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not delete class course with id ${classCourseId}` });
    }

    res.send({ message: "class course deleted successfully!" });
  });
}
};
