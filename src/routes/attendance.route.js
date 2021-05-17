const department = require("../controllers/department.controllers");
const stream = require("../controllers/stream.controllers");
const student = require("../controllers/student.controllers");
const instructor = require("../controllers/instructor.controllers");
const year_of = require("../controllers/year_of.controllers");
const semister = require("../controllers/semister.controllers");
const classes = require("../controllers/class.controllers");
const instructor_class = require("../controllers/instructor_class_course.controllers");
const admin = require("../controllers/admin.controllers");
const course = require("../controllers/course.controllers");
const class_course = require("../controllers/class_course.controllers");
const student_class_course = require("../controllers/student_class_course.controllers");
const limitter = require("express-rate-limit");
const registerLimmitter = limitter({
  windowMs: 5 * 60 * 1000,
  max: 2,
  message: {
    code: 429,
    message: "Toomany registration requests",
  },
});
const loginLimmitter = limitter({
  windowMs: 2 * 60 * 1000,
  max: 4,
  message: {
    code: 429,
    message: "Toomany registration requests",
  },
});
module.exports = (app) => {
  app.post("/student_login", loginLimmitter, student.login);

  app.post("/student_register", registerLimmitter, student.create);
  app.get("/student", student.findAll);
  app.post("/instructor_login", loginLimmitter, instructor.login);

  app.post("/instructor_register", registerLimmitter, instructor.create);

  // create a new instructor class
  app.post("/class_course", class_course.create);
   app.put("/class_course/:classCourseId", class_course.update);
   app.delete("/class_course/:classCourseId", class_course.delete);
  // retrieve all instructor class
  app.get("/class_course/:page/:countPerPage/:searchInput/:searchRequested", class_course.findAll);
  app.get("/student_class_course/:page/:countPerPage/:searchInput/:searchRequested", student_class_course.findAll);
  
  app.put("/student_class_course/:studentId", student_class_course.update);
  app.post("/student_class_course/", student_class_course.create);
  app.post("/course/", course.create);

  // retrieve all instructor class
  app.get(
    "/course/:page/:countPerPage/:searchInput/:searchRequested",
    course.findAll
  );


  app.get("/instructor", instructor.findAll);
  app.get(
    "/course_all",
    course.findAllCourse
  );
  app.put("/course/:courseId", course.update);
  app.delete("/course/:courseId", course.delete);
  // create a new instructor class
  app.post("/admin", admin.create);

  app.post("/admin_authorize", admin.isAutorized);
  app.post("/admin_logout", admin.logout);
  // retrieve all instructor class
  app.get("/admin", admin.findAll);

  // login all instructor class
  app.post("/admin_login", admin.login);

  // create a new instructor class
  app.post("/instructor_class", instructor_class.create);

  // retrieve all instructor class
  app.get("/instructor_class", instructor_class.findAll);

  // create a new class
  app.post("/class", classes.create);

  // retrieve all class
  app.get("/class", classes.findAll);

  // create a new year
  app.post("/semister", semister.create);

  // retrieve all year
  app.get("/semister", semister.findAll);

  // create a new year
  app.post("/year", year_of.create);

  // retrieve all year
  app.get("/year", year_of.findAll);

  // create a new dept
  app.post("/department", department.create);

  // retrieve all dept
  app.get(
    "/department/:page/:countPerPage/:searchInput/:searchRequested",
    department.findAll
  );

  app.get("/all_department", department.getAll);

  app.get("/department/:departmentId", department.findOne);

  // update a dept with customerId
  app.put("/department/:departmentId", department.update);

  // delete a dept with customerId
  app.delete("/department/:departmentId", department.delete);

  app.post("/stream", stream.create);

  // retrieve all dept
  app.get(
    "/stream/:page/:countPerPage/:searchInput/:searchRequested",
    stream.findAll
  );
  app.get("/all_stream", stream.getAllStream);
  // retrieve a single dept with customerId
  app.get("/stream/:streamId", stream.findOne);

  // update a dept with customerId
  app.put("/stream/:streamId", stream.update);

  // delete a dept with customerId
  app.delete("/stream/:streamId", stream.delete);
};
