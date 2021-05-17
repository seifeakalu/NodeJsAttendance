const db = require("./database");

const tableName = "student_class_courses";

// constructor
function StudentClass(student_class) {
  this.student_id = student_class.student_id;
  this.class_id = student_class.class_id;
  this.course_id = student_class.course_id;
  this.stream_id = student_class.stream_id;
}

// create new question
StudentClass.create = (student_class, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, student_class, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...student_class });
  });
};

// get single customer by id
StudentClass.findById = (id, result) => {
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


// update customers by id
StudentClass.updateById = (id, student_class, result) => {
  const sql = `UPDATE ${tableName} SET student_id = ?, class_id = ?, course_id = ?, stream_id = ? WHERE id= ?`;
console.log(student_class);
  db.query(sql, [student_class.student_id, student_class.class_id, student_class.course_id, student_class.stream_id, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({ result: "not_found" }, null);
      return;
    }

    result(null, { id, ...student_class });
  });
};
StudentClass.search = (page, countPerPage, searchInput, result) => {
  console.log("search page is " + page);
  console.log("search input is " + searchInput);
  console.log("cout per page  is " + countPerPage);
  const pageCount = page * countPerPage;
  const sql = "SELECT  student_class_courses.id ,student_class_courses.student_id, student_class_courses.class_id,student_class_courses.course_id,student_class_courses.stream_id,students.first_name AS first_name,students.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM student_class_courses JOIN students ON student_class_courses.student_id = students.id JOIN class ON student_class_courses.class_id = class.id JOIN courses ON student_class_courses.course_id = courses.id JOIN stream ON student_class_courses.stream_id = stream.id  ORDER BY student_class_courses.id   WHERE courses.title LIKE ? OR class.room_no LIKE ? OR stream.name LIKE ? OR instructors.first_name LIKE ?  OR instructors.last_name LIKE ? ORDER BY instructor_class_courses.id DESC LIMIT  "+pageCount+", "+countPerPage+"";
  var count = "SELECT COUNT(*) AS totalCount ,  student_class_courses.id ,student_class_courses.student_id, student_class_courses.class_id,student_class_courses.course_id,student_class_courses.stream_id,students.first_name AS first_name,students.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM student_class_courses JOIN students ON student_class_courses.student_id = students.id JOIN class ON student_class_courses.class_id = class.id JOIN courses ON student_class_courses.course_id = courses.id JOIN stream ON student_class_courses.stream_id = stream.id   WHERE courses.title LIKE ? OR class.room_no LIKE ? OR stream.name LIKE ?  OR instructors.first_name LIKE ?  OR instructors.last_name LIKE ? ";

  db.query(
    count,
    [
      searchInput + "%",
      searchInput + "%",
      searchInput + "%",
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
          searchInput + "%",
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

StudentClass.getAll = (page, countPerPage, result) => {
  const pageCount = page * countPerPage;
  const sql = "SELECT  student_class_courses.id ,student_class_courses.student_id, student_class_courses.class_id,student_class_courses.course_id,student_class_courses.stream_id,students.first_name AS first_name,students.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM student_class_courses JOIN students ON student_class_courses.student_id = students.id JOIN class ON student_class_courses.class_id = class.id JOIN courses ON student_class_courses.course_id = courses.id JOIN stream ON student_class_courses.stream_id = stream.id  ORDER BY student_class_courses.id DESC LIMIT  "+pageCount+", "+countPerPage+"";
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
// remove single customer with the id
StudentClass.remove = (id, result) => {
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

module.exports = StudentClass;
