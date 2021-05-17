const db = require("./database");

const tableName = "stream";

// constructor
function Stream(stream) {
    this.name = stream.name;
    this.description = stream.description;
    this.department_id = stream.department_id;
    this.year_of_id = stream.year_of_id;
    this.class_id = stream.class_id;
    this.semister_id = stream.semister_id;
}

// create new question
Stream.create = (stream, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, stream, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.id, ...stream });
  });
};


// get single department by id
Stream.findById = (id, result) => {
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
Stream.search = (page, countPerPage, searchInput, result) => {
  console.log("search page is " + page);
  console.log("search input is " + searchInput);
  console.log("cout per page  is " + countPerPage);
  const pageCount = page * countPerPage;
  const sql = "SELECT stream.name , stream.id,stream.department_id, stream.year_of_id, stream.class_id, stream.semister_id, stream.description, department.name AS department, year_of.year_date AS year, class.room_no AS room, semister.semister_no AS semister  FROM stream JOIN department ON stream.department_id = department.id JOIN year_of ON stream.year_of_id = year_of.id JOIN class ON stream.class_id = class.id JOIN semister ON stream.semister_id = semister.id  WHERE stream.name LIKE ? OR stream.description LIKE ?  ORDER BY stream.id DESC LIMIT  "+pageCount+", "+countPerPage+"";
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

Stream.getAll = (page, countPerPage, result) => {
  const pageCount = page * countPerPage;
  const sql =  "SELECT stream.name ,stream.id,stream.department_id,stream.year_of_id,stream.class_id,stream.semister_id, stream.description, department.name AS department, year_of.year_date AS year, class.room_no AS room, semister.semister_no AS semister  FROM stream JOIN department ON stream.department_id = department.id JOIN year_of ON stream.year_of_id = year_of.id JOIN class ON stream.class_id = class.id JOIN semister ON stream.semister_id = semister.id ORDER BY stream.id DESC LIMIT "+pageCount+","+countPerPage+"";
  //const sql = `SELECT * FROM ${tableName}  ORDER BY id DESC LIMIT ${pageCount}, ${countPerPage} `;
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

Stream.getAllStream = (result) => {
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
Stream.updateById = (id, stream, result) => {
  const sql = `UPDATE ${tableName} SET name = ?, description = ?, department_id = ?, year_of_id = ?, class_id =?, semister_id=? WHERE id= ?`;

  db.query(
    sql,
    [stream.name, stream.description,stream.department_id,stream.year_of_id,stream.class_id,stream.semister_id, id],
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

      result(null, { id, ...stream });
    }
  );
};

// remove single customer with the id
Stream.remove = (id, result) => {
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

module.exports = Stream;
