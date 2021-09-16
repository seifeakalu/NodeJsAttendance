const Stream = require("../models/stream.model");
exports.create = (req, res) => {

  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  const stream = new Stream({
    name: req.body.name,
    description: req.body.description,
    department_id: req.body.department_id,
    year_of_id: req.body.year_of_id,
    class_id: req.body.class_id,
    semister_id: req.body.semister_id,
  });
  if (req.session.AdminLogged) {
  Stream.create(stream, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stram.",
      });
    } else res.send({ message: "|Stram was created successfully!", data });
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
    Stream.search(page, countPerPage, searchInput, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieve dept.",
        });

      res.send(data);
    });

    
  } else {
    Stream.getAll(
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

exports.getAllStream = (req, res) => {
  if (req.session.AdminLogged) {
  Stream.getAllStream((err, data) => {
     if (err) {
       res.status(500).send({
         message: err.message || "Some error occurred while retrieving Semister.",
       });
     } else res.send(data);
   });
  }
 };

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { streamId } = req.params;
  Stream.findById(streamId, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${streamId}` })
        : res.status(500).send({
            message: `Could not retrieve stream with id ${streamId}`,
          });
    } else res.send(data);
  });
}
};

exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { streamId } = req.params;
  const stream = new Stream(req.body);

  Stream.updateById(streamId, stream, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${streamId}` })
        : res.status(500).send({
            message: `Could not update stream with id ${streamId}`,
          });
    } else {
      res.send({ message: "stream was updated successfully!", data });
    }
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { streamId } = req.params;

  Stream.remove(streamId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res
            .status(404)
            .send({ message: `Not found stream with id ${streamId}` })
        : res.status(500).send({
            message: `Could not delete stream with id ${streamId}`,
          });
    } else {
      res.send({ message: "stream  deleted successfully!" });
    }
  });
}
};
