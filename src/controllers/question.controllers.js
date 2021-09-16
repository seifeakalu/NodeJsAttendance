const Question= require("../models/question.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const question = new Question({
    title: req.body.title,
    question: req.body.question,
    student_id: req.body.student_id,
  });
  if (req.session.AdminLogged) {
  Question.create(question, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the customer." });

    res.send({ message: "Question was created successfully!", data });
  });
}
};


exports.findAll = (req, res) => {
  if (req.session.AdminLogged) {
  Question.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve customers." });

    res.send(data);
  });
}
};

exports.findOne = (req, res) => {
  if (req.session.AdminLogged) {
  const { questionId } = req.params;
  Question.findById(questionId, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customers with id ${questionId}` })
        : res.status(500).send({ message: `Could not retrieve customer with id ${questionId}` });
    }

    res.send(data);
  });
}
};
exports.update = (req, res) => {
  if (req.session.AdminLogged) {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { questionId } = req.params;
  const question = new Customer(req.body);

  Question.updateById(questionId, question, (err, data) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
        : res.status(500).send({ message: `Could not update customer with id ${customerId}` });
    }

    res.send({ message: "Question was updating successfully!", data });
  });
}
};

exports.delete = (req, res) => {
  if (req.session.AdminLogged) {
  const { questionId } = req.params;

  Question.remove(questionId, (err) => {
    if (err) {
      err.result === "not_found"
        ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
        : res.status(500).send({ message: `Could not delete customer with id ${customerId}` });
    }

    res.send({ message: "Question was deleted successfully!" });
  });
}
};


