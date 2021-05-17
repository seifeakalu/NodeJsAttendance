const Question= require("../models/question.model");

// create and save a new customer
exports.create = (req, res) => {
  // validate request
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  // create new question
  const question = new Question({
    title: req.body.title,
    question: req.body.question,
    student_id: req.body.student_id,
  });
  if (req.session.AdminLogged) {
  // save question in the database
  Question.create(question, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });

    res.send({ message: "Question was created successfully!", data });
  });
}
};

// retrieve all question from the database
exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Question.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

// find a single quetion with the customerId
exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { questionId } = req.params;
  Question.findById(questionId, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${questionId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${questionId}` });
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

  const { questionId } = req.params;
  const question = new Customer(req.body);

  Question.updateById(questionId, question, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
        : res.status(500).send({ message: `Could not update customer with id ${customerId}` });
    }

    res.send({ message: "Question was updating successfully!", data });
  });
}
};

// delete a question with the specified customerId in the request
exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { questionId } = req.params;

  Question.remove(questionId, (err) => {
    if (err) {
      // eslint-disable-next-line no-unused-expressions
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${customerId}` });
    }

    res.send({ message: "Question was deleted successfully!" });
  });
}
};


