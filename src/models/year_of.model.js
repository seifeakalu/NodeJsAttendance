const db = require("./database");

const tableName = "year_of";

// constructor
function YearOf(year_of) {
    this.year_date = year_of.year_date;
    this.description = year_of.description;
   
   
}

// create new question
YearOf.create = (year_of, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, year_of, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.id, ...year_of });
  });
};


// get single department by id
YearOf.findById = (id, result) => {
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
YearOf.getAll = (result) => {
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
YearOf.updateById = (id, year_of, result) => {
  const sql = `UPDATE ${tableName} SET name = ?, description = ?, department_id = ? WHERE id= ?`;

  db.query(
    sql,
    [year_of.name, year_of.description,year_of.department_id, id],
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

      result(null, { id, ...year_of });
    }
  );
};

// remove single customer with the id
YearOf.remove = (id, result) => {
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

module.exports = YearOf;
