const Student = require("../models/student.model");
const crypto = require("crypto");
// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new user
  const student = new Student({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    gender: req.body.gender,
    student_id: req.body.student_id,
    username: req.body.username,
    password: generateHash(req.body.password),

  });
  if (req.session.AdminLogged) {
  // save question in the database
  Student.create(student, (err, data) => {
    if (err)
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the customer.",
        });
  else
    res.send({ message: "|User was created successfully!", data, success: true });
  });
}
};
function generateHash(password) {
  const hashingSecret = "PasswordSecretKey";

  const hashedStr = crypto
    .createHmac("sha256", hashingSecret)
    .update(password)
    .digest("hex");

  return hashedStr;
}
// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Student.getAll((err, data) => {
    if (err)
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while retrieve customers.",
        });
  else
    res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { userId } = req.params;
  Student.findById(studentId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customers with id ${userId}` })
        : res
            .status(500)
            .send({
              message: `Could not retrieve customer with id ${userId}`,
            });
    }

    res.send(data);
  });
}
};

// update a question identified by the customerId in the request
exports.login = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  const student = new Student(req.body);
  student.password = generateHash(req.body.password);
  console.log(student);
  Student.login(student, (err, result) => {
    if (err){ 
      res
      .status(500)
      .send({ message: err.message || "Some error occurred during login" });
    }       
   else
    res.send({ result });
  });
}
};

// update a question identified by the customerId in the request
exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { userId } = req.params;
  const user = new User(req.body);

  Student.updateById(userId, user, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customer with id ${userId}` })
        : res
            .status(500)
            .send({
              message: `Could not update customer with id ${userId}`,
            });
    }

    res.send({ message: "user was updated successfully!", data });
  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { userId } = req.params;

  Student.remove(userId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customer with id ${userId}` })
        : res
            .status(500)
            .send({
              message: `Could not delete customer with id ${userId}`,
            });
    }

    res.send({ message: "User deleted successfully!" });
  });
}
};
