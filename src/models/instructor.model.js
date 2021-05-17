const db = require("./database");

const tableName = "instructors";

// constructor
function Instructor(instructor) {
  if (instructor.first_name) {
    this.first_name = instructor.first_name;
    this.last_name = instructor.last_name;
    this.phone = instructor.phone;
    this.gender = instructor.gender;
    this.username = instructor.username;
    this.password = instructor.password;
  } else {
    this.username = instructor.username;
    this.password = instructor.password;
  }
}

// create new question
Instructor.create = (instructor, result) => {
  const sql = `SELECT * FROM ${tableName} WHERE username = ?`;
  db.query(sql, [instructor.username], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length === 0) {
      const sql = `INSERT INTO ${tableName} SET ?`;
      db.query(sql, instructor, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, { id: res.insertId, ...instructor, success: true });
      });
    } else {
      result({ message: "user already exist", success: false }, null);
      return;
    }

    //  result(null, res[0]);

    // not found Customer with the id
  });
};

Instructor.login = (instructor, result) => {
  db.query(
    `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`,
    [instructor.username, instructor.password],
    function (error, results, fields) {
      if (results.length > 0) {
        result(null, {
          results,
          studentLogged: false,
          instractorLogged: false,
          adminLogged: true,
          success: true,
        });
      } else {
        result(null, {
          message: "Incorrect username or password",
          success: false,
        });
      }
    }
  );
};

// get single customer by id
Instructor.findById = (id, result) => {
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
Instructor.getAll = (result) => {
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
Instructor.updateById = (id, instructor, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(
    sql,
    [instructor.title, instructor.question, instructor.student_id, id],
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

      result(null, { id, ...instructor });
    }
  );
};

// remove single customer with the id
Instructor.remove = (id, result) => {
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

module.exports = Instructor;
