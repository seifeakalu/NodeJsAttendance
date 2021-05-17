const db = require("./database");

const tableName = "class";

// constructor
function Class(classes) {
  this.room_no = classes.room_no;
}

// create new question
Class.create = (classes, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, classes, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...classes });
  });
};

// get single customer by id
Class.findById = (id, result) => {
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
Class.getAll = (result) => {
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
Class.updateById = (id, classes, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(
    sql,
    [classes.room_no, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Customer with the id
        result({ result: "not_found" }, null);
        return;
      }

      result(null, { id, ...classes });
    }
  );
};

// remove single customer with the id
Class.remove = (id, result) => {
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

module.exports = Class;
