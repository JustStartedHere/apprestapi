var connection = require("../koneksi");
var mysql = require("mysql2");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// controller untuk regitrasi
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: Date.now(),
  };

  var query = "SELECT email FROM ?? WHERE ?? = ?";
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);
  connection.query(query, table, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil menambahkan data user baru", res);
          }
        });
      } else {
        response.ok("Email sudah terdaftar!", res);
      }
    }
  });
};

// controller untuk login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
  var table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);
  console.log(query);
  connection.query(query, (error, rows) => {
      if (error) {
          console.log(error);
        } else {
            if (rows == 1) {
          console.log(rows);
        var token = jwt.sign({ rows }, config.secret, { expiresIn: 1440 });
        id_user = rows[0].id;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ? ";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT tergenerate!",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ error: true, message: "Email atau password salah!" });
      }
    }
  });
};
