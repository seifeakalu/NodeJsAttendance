const db = require("./database");

const tableName = "department";

// constructor
function Department(department) {
    this.name = department.name;
    this.description = department.description;
}

// create new question
Department.create = (department, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, department, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...department });
  });
};

Department.getAllDept = (result) => {
  const sql = `SELECT * FROM ${tableName}`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};



Department.search = (page, countPerPage, searchInput, result) => {
  console.log("search page is " + page);
  console.log("search input is " + searchInput);
  console.log("cout per page  is " + countPerPage);
  const pageCount = page * countPerPage;
  const sql = `SELECT * FROM ${tableName} WHERE name LIKE ? OR description LIKE ?   ORDER BY id DESC LIMIT ${pageCount}, ${countPerPage}`;
  var count = `SELECT COUNT(*) AS totalCount FROM ${tableName} WHERE name LIKE ? OR description	 LIKE ?`;

  db.query(
    count,
    [
      searchInput + "%",
      searchInput + "%",
      
    ],
    (err, resCount) => {
      if (err) {
        result(null, err);
        return;
      }

      db.query(
        sql,
        [
          searchInput + "%",
          searchInput + "%",
         
        ],
        (err, res) => {
          if (err) {
            result(null, err);
            return;
          }
          if (resCount[0].totalCount != 0) {
            res.push({ countRow: resCount[0].totalCount });
            result(null, res);
          }
          else
          result(null, res);
        }
      );
    }
  );
};

Department.getAll = (page, countPerPage, result) => {
  const pageCount = page * countPerPage;
  const sql = `SELECT * FROM ${tableName}  ORDER BY id DESC LIMIT ${pageCount}, ${countPerPage} `;
  var count = `SELECT COUNT(*) AS totalCount FROM ${tableName} `;
 
  db.query(count, (err, resCount) => {
    if (err) {
      result(null, err);
      return;
    }
 
          db.query(sql, (err, res) => {
            if (err) {
              result(null, err);
              return;
            }
            if (resCount[0].totalCount != 0) {
            
              
              res.push({ countRow: resCount[0].totalCount });
            }

            result(null, res);
          });
        });
 
};





// get single customer by id
Department.findById = (id, result) => {
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


// update customers by id
Department.updateById = (id, department, result) => {
  const sql = `UPDATE ${tableName} SET name = ?, description = ? WHERE id = ?`;

  db.query(
    sql,
    [department.name, department.description, id],
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

      result(null, { id, ...department});
    }
  );
};

// remove single customer with the id
Department.remove = (id, result) => {
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

module.exports = Department;
