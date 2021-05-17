const db = require("./database");

const tableName = "instructor_class_courses";

// constructor
function InsClass(ins_class) {
  this.instructor_id = ins_class.instructor_id;
  this.class_id = ins_class.class_id;
  this.course_id = ins_class.course_id;
  this.stream_id = ins_class.stream_id;
}

// create new question
InsClass.create = (ins_class, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, ins_class, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...ins_class });
  });
};

// get single customer by id
InsClass.findById = (id, result) => {
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
InsClass.getAll = (result) => {
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
InsClass.updateById = (id, ins_class, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(sql, [ins_class.instructor_id, ins_class.class_course_id, ins_class.stream_id, id], (err, res) => {
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
  });
};

// remove single customer with the id
InsClass.remove = (id, result) => {
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

module.exports = InsClass;
