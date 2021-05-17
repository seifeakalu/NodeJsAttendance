const db = require("./database");

const tableName = "semister";

// constructor
function Semister(semister) {
    this.semister_no = semister.semister_no;
    this.year_of_id = semister.year_of_id;
   
}

// create new question
Semister.create = (semister, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, semister, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.id, ...semister });
  });
};


// get single department by id
Semister.findById = (id, result) => {
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
Semister.getAll = (result) => {
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
Semister.updateById = (id, semister, result) => {
  const sql = `UPDATE ${tableName} SET name = ?, description = ?, department_id = ? WHERE id= ?`;

  db.query(
    sql,
    [semister.semister_no, semister.year_of_id, id],
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

      result(null, { id, ...semister });
    }
  );
};

// remove single customer with the id
Semister.remove = (id, result) => {
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

module.exports = Semister;
