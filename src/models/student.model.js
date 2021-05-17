const db = require("./database");

const tableName = "students";


// constructor
function Student(student) {
  if (student.class_id) {
    this.first_name = student.first_name;
    this.last_name = student.last_name;
    this.phone = student.phone;
    this.gender = student.gender;
    this.student_id = student.student_id;
    this.username = student.username;
    this.password = student.password;


  } else {
    this.username = student.username;
    this.password = student.password;
  }
}

// create new question
Student.create = (student, result) => {


  const sql = `SELECT * FROM ${tableName} WHERE username = ?`;
  db.query(sql, [student.username], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length === 0) {
      const sql = `INSERT INTO ${tableName} SET ?`;
      db.query(sql, student, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, { id: res.insertId, ...student, success: true });
      });
    }
    else{
    result( { message: "user already exist", success: false }, null);
      return;

    }

  //  result(null, res[0]);

    // not found Customer with the id
  });


};

Student.login = (student, result) => {
  db.query(
      `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`,
      [student.username, student.password],
      function (error, results, fields) {
        if (results.length > 0) {

          result(null,   { results, studentLogged: true, instractorLogged: false, adminLogged: false, success: true } );
        } 
        else {

              
          result(null,  { message: "Incorrect username or password", success: false } );
        }
      
      }
    );
};

// get single customer by id
Student.findById = (id, result) => {
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
Student.getAll = (result) => {
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
Student.updateById = (id, student, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(
    sql,
    [student.title, student.question, student.student_id, id],
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

      result(null, { id, ...customer });
    }
  );
};

// remove single customer with the id
Student.remove = (id, result) => {
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

module.exports = Student;
