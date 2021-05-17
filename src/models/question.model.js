const db = require("./database");

const tableName = "question";

// constructor
function Question(question) {
  this.title = question.title;
  this.question = question.question;
  this.student_id = question.student_id;
}

// create new question
Question.create = (question, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, question, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...question });
  });
};

// get single customer by id
Question.findById = (id, result) => {
  const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
  db.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length === 0) {
      result({ result: "not_found" }, null);
      return;
    }

    result(null, res[0]);

    // not found Customer with the id
  });
};

// get all customers
Question.getAll = (result) => {
  const sql = `SELECT * FROM ${tableName}`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// update customers by id
Question.updateById = (id, question, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(sql, [question.title, question.question, question.student_id, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({ result: "not_found" }, null);
      return;
    }

    result(null, { id, ...customer });
  });
};

// remove single customer with the id
Question.remove = (id, result) => {
  const sql = `DELETE FROM ${tableName} WHERE id = ?`;
  db.query(sql, id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      result({ result: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

// remove all customers

module.exports = Question;
