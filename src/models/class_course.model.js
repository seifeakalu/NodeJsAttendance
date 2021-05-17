const db = require("./database");

const tableName = "instructor_class_courses";

// constructor
function ClassCourse(class_course) {
  this.instructor_id = class_course.instructor_id;
  this.class_id = class_course.class_id;
  this.course_id = class_course.course_id;
  this.stream_id = class_course.stream_id;

}

// create new question
ClassCourse.create = (class_course, result) => {
  const sql = `INSERT INTO ${tableName} SET ?`;
  db.query(sql, class_course, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...class_course });
  });
};

// get single customer by id
ClassCourse.findById = (id, result) => {
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
ClassCourse.search = (page, countPerPage, searchInput, result) => {
  console.log("search page is " + page);
  console.log("search input is " + searchInput);
  console.log("cout per page  is " + countPerPage);
  const pageCount = page * countPerPage;
  const sql = "SELECT  instructor_class_courses.id ,instructor_class_courses.instructor_id, instructor_class_courses.class_id,instructor_class_courses.course_id,instructor_class_courses.stream_id,instructors.first_name AS first_name,instructors.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM instructor_class_courses JOIN instructors ON instructor_class_courses.instructor_id = instructors.id JOIN class ON instructor_class_courses.class_id = class.id JOIN courses ON instructor_class_courses.course_id = courses.id JOIN stream ON instructor_class_courses.stream_id = stream.id   WHERE courses.title LIKE ? OR class.room_no LIKE ? OR stream.name LIKE ? OR instructors.first_name LIKE ?  OR instructors.last_name LIKE ? ORDER BY instructor_class_courses.id DESC LIMIT  "+pageCount+", "+countPerPage+"";
  var count = "SELECT COUNT(*) AS totalCount ,  instructor_class_courses.id ,instructor_class_courses.instructor_id, instructor_class_courses.class_id,instructor_class_courses.course_id,instructor_class_courses.stream_id,instructors.first_name AS first_name,instructors.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM instructor_class_courses JOIN instructors ON instructor_class_courses.instructor_id = instructors.id JOIN class ON instructor_class_courses.class_id = class.id JOIN courses ON instructor_class_courses.course_id = courses.id JOIN stream ON instructor_class_courses.stream_id = stream.id   WHERE courses.title LIKE ? OR class.room_no LIKE ? OR stream.name LIKE ?  OR instructors.first_name LIKE ?  OR instructors.last_name LIKE ? ";

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

ClassCourse.getAll = (page, countPerPage, result) => {
  const pageCount = page * countPerPage;
  const sql = "SELECT  instructor_class_courses.id ,instructor_class_courses.instructor_id, instructor_class_courses.class_id,instructor_class_courses.course_id,instructor_class_courses.stream_id,instructors.first_name AS first_name,instructors.last_name AS last_name, class.room_no AS room, courses.title AS course,stream.name AS stream  FROM instructor_class_courses JOIN instructors ON instructor_class_courses.instructor_id = instructors.id JOIN class ON instructor_class_courses.class_id = class.id JOIN courses ON instructor_class_courses.course_id = courses.id JOIN stream ON instructor_class_courses.stream_id = stream.id  ORDER BY instructor_class_courses.id DESC LIMIT  "+pageCount+", "+countPerPage+"";
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

// update customers by id
ClassCourse.updateById = (id, class_course, result) => {
  const sql = `UPDATE ${tableName} SET instructor_id = ?, class_id = ?,course_id = ?,stream_id = ? WHERE id= ?`;

  db.query(sql, [class_course.instructor_id, class_course.class_id, class_course.course_id, class_course.stream_id, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Customer with the id
      result({ result: "not_found" }, null);
      return;
    }

    result(null, { id, ...class_course });
  });
};

// remove single customer with the id
ClassCourse.remove = (id, result) => {
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

module.exports = ClassCourse;
