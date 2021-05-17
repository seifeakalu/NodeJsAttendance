const Admin = require("../models/admin.model");
const crypto = require("crypto");
// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new user
  const admin = new Admin({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: generateHash(req.body.password),
  });

  // save question in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the admin.",
      });
    else res.send({ message: "Admin was created successfully!", data });
  });
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
  Admin.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieve admin.",
      });
    else res.send(data);
  });
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  const { adminId } = req.params;
  Admin.findById(adminId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customers with id ${adminId}` })
        : res.status(500).send({
            message: `Could not retrieve customer with id ${adminId}`,
          });
    } else res.send(data);
  });
};

// update a question identified by the customerId in the request
exports.login = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  const admin = new Admin(req.body);
  admin.password = generateHash(req.body.password);
  console.log(admin);
  Admin.login(admin, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occurred during login" });
    } else {
      if (result.adminLogged) {
        req.session.autenticated = true;
        req.session.AdminLogged = true;
        
      
      }
      console.log(result.first_name);
      res.send({ result });
    }
  });
};

// update a question identified by the customerId in the request
exports.update = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { adminId } = req.params;
  const admin = new Admin(req.body);

  Admin.updateById(adminId, admin, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found admin with id ${adminId}` })
        : res.status(500).send({
            message: `Could not update admin with id ${adminId}`,
          });
    }

    res.send({ message: "admin was updated successfully!", data });
  });
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  const { adminId } = req.params;

  Admin.remove(adminId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found admin with id ${adminId}` })
        : res.status(500).send({
            message: `Could not delete admin with id ${adminId}`,
          });
    } else res.send({ message: "Admin deleted successfully!" });
  });
};

exports.isAutorized = (req, resp) => {
  if (req.session.AdminLogged) {
    resp.json({
      authorized: true,
    });
  } else {
    resp.json({ authorized: false });
  }
};
exports.logout = (req, resp) => {
  if (req.session.AdminLogged) {
    console.log("i am in");
    req.session.destroy();
    resp.clearCookie("expressSessionId"); // clean up!
    return resp.json({ msg: "logging you out" });
  }
};