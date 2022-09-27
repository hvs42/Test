var mysql = require("mysql");

var pool = mysql.createConnection({
  host: "db4free.net",
  user: "testdb753",
  port: 3306,
  database: "testdb753",
  connectionLimit: 100,
  password: "Testdb@753",
  multipleStatements: true
});

pool.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  }); 
module.exports = pool;
