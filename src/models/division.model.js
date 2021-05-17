const db = require("./database");

const tableName = "division";

// constructor
function Division(division) {
    this.name = division.name;
    this.description = division.description;
    this.department_id = division.department_id;
    
}

// create new question
Division.create = (division, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, division, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.id, ...division });
  });
};


// get single department by id
Division.findById = (id, result) => {
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
Division.getAll = (result) => {
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
Division.updateById = (id, division, result) => {
  const sql = `UPDATE ${tableName} SET name = ?, description = ?, department_id = ? WHERE id= ?`;

  db.query(
    sql,
    [division.name, division.description,division.department_id, id],
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

      result(null, { id, ...division });
    }
  );
};

// remove single customer with the id
Division.remove = (id, result) => {
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

module.exports = Division;
