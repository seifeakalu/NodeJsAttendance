
const ClassCourse= require("../models/class_course.model");

// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new question
  const class_course = new ClassCourse({
    instructor_id: req.body.instructor_id,
    class_id: req.body.class_id,
    course_id: req.body.course_id,
    stream_id: req.body.stream_id,
  });

  // save question in the database
  if (req.session.AdminLogged) {
  ClassCourse.create(class_course, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Class Course." });
    else
    res.send({ message: "Class Course created successfully!", data });
  });
}
};

// retrieve all question from the database

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
// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { classCourseId } = req.params;
  ClassCourse.findById(classCourseId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${classCourseId}` });
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

  const { classCourseId } = req.params;
  const class_course = new ClassCourse(req.body);

  ClassCourse.updateById(classCourseId, class_course, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not update customer with id ${classCourseId}` });
    }

    res.send({ message: "Class Course  updated successfully!", data });
  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { classCourseId } = req.params;

  ClassCourse.remove(classCourseId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found class course with id ${classCourseId}` })
        : res.status(500).send({ message: `Could not delete class course with id ${classCourseId}` });
    }

    res.send({ message: "class course deleted successfully!" });
  });
}
};
