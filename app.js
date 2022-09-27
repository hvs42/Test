var pool = require("./pool");
var express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//for login
app.post("/login", function (request, response) {

  let username = request.body.username;
  let password = request.body.password;

//   let username = "hvs12345";
//   let password = "hvs12345@gmail.com";

  if (username && password) {

    pool.query(`select * from UserLogin where username = ? and password = ?`, [username, password], (err, result, fields) => {
        if(err)
        {
            console.log(err);
        }
        if (result.length > 0) {

          console.log(result);
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});


//for registration

app.post("/registration", function (request, response) {

    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;
    let name = request.body.name;
  
    // var user = {
    //     username: 'hvs12345',
    //     Name: 'Harsh',
    //     email: 'hvs12345@gmail.com',
    //     password: 'hvs12345@gmail.com'
    // }

    // var user = {
        // username: 'hvs1236245',
        // Name: 'Harsh Singh',
        // email: 'hvs1234555@gmail.com',
        // password: 'hvs1234555@gmail.com'
    // }

     var user = {
        username: username,
        Name: name,
        email: email,
        password: password
    }

    if (username && password && email && name) {
  
        pool.query(`select * from UserLogin where username = ?`, [username], (err, result, fields) => {
            if (result.length > 0) {
  
                console.log("Username Already exist");
                response.send("User already Exists");
                return;
              }
        });

      pool.query(`INSERT INTO UserLogin SET ?`, user, (err, result, fields) => {
          if(err)
          {
              console.log(err);
          }
          else
          {
            console.log("Successfull Login");

            console.log(result);
          }
          response.end();
        }
      );
    } else {
      response.send("Please enter Username and Password!");
      response.end();
    }
  });

//   let usernames = "hvs123456";

//   pool.query(`select * from UserLogin where username = ?`, [usernames], (err, result, fields) => {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });
// pool.query(`select * from UserLogin`, (err, result, fields) => {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });
app.listen(3000);