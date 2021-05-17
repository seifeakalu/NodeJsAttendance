const db = require("./database");

const tableName = "courses";

// constructor
function Course(course) {
  this.title = course.title;
  this.description = course.description;

}

// create new question
Course.create = (course, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, course, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...course });
  });
};

// get single customer by id
Course.findById = (id, result) => {
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

Course.getAll = (page, countPerPage, result) => {
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

Course.search = (page, countPerPage, searchInput, result) => {
  console.log("search page is " + page);
  console.log("search input is " + searchInput);
  console.log("cout per page  is " + countPerPage);
  const pageCount = page * countPerPage;
  const sql = `SELECT * FROM ${tableName} WHERE title LIKE ? OR description LIKE ?   ORDER BY id DESC LIMIT ${pageCount}, ${countPerPage}`;
  var count = `SELECT COUNT(*) AS totalCount FROM ${tableName} WHERE title LIKE ? OR description	 LIKE ?`;

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
// get all customers


// update customers by id
Course.updateById = (id, course, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, description = ? WHERE id= ?`;

  db.query(sql, [course.title, course.description, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({ result: "not_found" }, null);
      return;
    }

    result(null, { id, ...course });
  });
};
Course.getAllCourse = (result) => {
  const sql = `SELECT * FROM ${tableName}`;
  db.query(sql, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};
// remove single customer with the id
Course.remove = (id, result) => {
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

module.exports = Course;
