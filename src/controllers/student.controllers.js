const Student = require("../models/student.model");
const crypto = require("crypto");
exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
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

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { userId } = req.params;
  Student.findById(studentId, (err, data) => {
    if (err) {
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

exports.login = (req, res) => {
  if (req.session.AdminLogged) {
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

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { userId } = req.params;
  const user = new User(req.body);

  Student.updateById(userId, user, (err, data) => {
    if (err) {
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

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { userId } = req.params;

  Student.remove(userId, (err) => {
    if (err) {
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
