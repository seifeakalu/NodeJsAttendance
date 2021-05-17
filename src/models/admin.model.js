const db = require("./database");

const tableName = "admin";


// constructor
function Admin(admin) {
  if (admin.first_name) {
    this.first_name = admin.first_name;
    this.last_name = admin.last_name;
    this.username = admin.username;
    this.password = admin.password;


  } else {
    this.username = admin.username;
    this.password = admin.password;
  }
}

// create new question
Admin.create = (admin, result) => {


  const sql = `SELECT * FROM ${tableName} WHERE username = ?`;
  db.query(sql, [admin.username], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length === 0) {
      const sql = `INSERT INTO ${tableName} SET ?`;
      db.query(sql, admin, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, { id: res.insertId, ...admin, success: true });
      });
    }
    else{
    result( { message: "admin already exist", success: false }, null);
      return;

    }

  //  result(null, res[0]);

    // not found Customer with the id
  });


};

Admin.login = (admin, result) => {
  db.query(
      `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`,
      [admin.username, admin.password],
      function (error, results, fields) {
        if (results.length > 0) {
          console.log(results.data);
          result(null,   { results, studentLogged: false, instractorLogged: false, adminLogged: true, success: true } );
        } 
        else {

              
          result(null,  { message: "Incorrect username or password", success: false } );
        }
      }
    );
};

// get single customer by id
Admin.findById = (id, result) => {
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
Admin.getAll = (result) => {
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
Admin.updateById = (id, admin, result) => {
  const sql = `UPDATE ${tableName} SET title = ?, question = ?, student_id = ? WHERE id= ?`;

  db.query(
    sql,
    [admin.title, admin.question, admin.student_id, id],
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

      result(null, { id, ...admin });
    }
  );
};

// remove single customer with the id
Admin.remove = (id, result) => {
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

module.exports = Admin;
