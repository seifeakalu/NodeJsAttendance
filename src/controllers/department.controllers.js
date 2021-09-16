const Department = require("../models/department.model");
exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const department = new Department({
    name: req.body.name,
    description: req.body.description,
  });
  if (req.session.AdminLogged) {
  Department.create(department, (err, data) => {
    if (err)
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the customer.",
        });
else
    res.send({ message: "|Department was created successfully!", data });
  });
}
};

exports.getAll = (req, res) => {
  if (req.session.AdminLogged) {
 Department.getAllDept((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Semister.",
      });
    } else res.send(data);
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
      Department.search(page, countPerPage, searchInput, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieve dept.",
          });

        res.send(data);
      });

      
    } else {
      Department.getAll(
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
  const { departmentId } = req.params;
  Department.findById(departmentId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customers with id ${departmentId}` })
        : res
            .status(500)
            .send({
              message: `Could not retrieve customer with id ${departmentId}`,
            });
    }
 else{

   res.send(data);
 }

  });
}
};


exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { departmentId } = req.params;
  const department = new Department(req.body);

  Department.updateById(departmentId, department, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found dept with id ${departmentId}` })
        : res
            .status(500)
            .send({
              message: `Could not update dept with id ${departmentId}`,
            });
    }
else {    res.send({ message: "department  updated successfully!", data });}

  });
}
};
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { departmentId } = req.params;

  Department.remove(departmentId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found customer with id ${departmentId}` })
        : res
            .status(500)
            .send({
              message: `Could not delete customer with id ${departmentId}`,
            });
    }
else{

  res.send({ message: "department  deleted successfully!" });
}

  });
}
};
