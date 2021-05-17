const Course = require("../models/course.model");

// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new question
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
  });

  // save question in the database
  Course.create(course, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });
    else
    res.send({ message: "Course created successfully!", data });
  });
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
      Course.search(page, countPerPage, searchInput, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieve dept.",
          });

        res.send(data);
      });

      
    } else {
      Course.getAll(
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
  const { courseId } = req.params;
  Course.findById(courseId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found course with id ${questionId}` })
        : res.status(500).send({ message: `Could not retrieve course with id ${questionId}` });
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

  const { courseId } = req.params;
  const course = new Course(req.body);

  Course.updateById(courseId, course, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${courseId}` })
        : res.status(500).send({ message: `Could not update customer with id ${courseId}` });
    }

    res.send({ message: "Course updated successfully!", data });
  });
}
};
exports.findAllCourse = (req, res) => {
  if (req.session.AdminLogged) {
  Course.getAllCourse((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};
// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { courseId } = req.params;

  Course.remove(courseId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${courseId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${courseId}` });
    }

    res.send({ message: "Course  deleted successfully!" });
  });
}
};
