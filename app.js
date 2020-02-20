const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require("fs");
const port = 8800;



// bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("views"));

// storing value

let user_data = {}

// Registration Page route

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

      // storing data

      ;
    user_data.email = req.body.email; // sending email inside data
    user_data.password = hashedPassword; // sending pass inside data
    // appending data into txt db

    fs.writeFile('store.txt', JSON.stringify(user_data), (err) => {

      // stringfy the user_data above

      if (err) {
        throw err;
      } else {
        // res.send("Data Sent to Text File");
        res.redirect("/register/login")
      }
    })

  } catch (err) {
    console.log(err)
  }


});

// Login Page Route
app.get('/register/login', (req, res) => {
  res.sendFile(__dirname + "/views/reg.html")
})

app.post('/register/login', async (req, res) => {
  // const user = user_data.find(user => user.email === req.body.email)
  const { email, password } = req.body;
  let user = {}
  if (email === user_data.email) {
    user = user_data;
  }
  if (user.length === 0) {
    return res.send('cannot find the user')
  } try {

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`<h1 style = "color:green;">User Authentication Succesful</h1>`);
    } else {
      res.send(`Not allowed`)
    }

  } catch (err) {
    console.log(err)
  }
})


// Login using 



// listening to ports
app.listen(port, () => console.log(`server started at ${port}`))





















// // creating Routes for live sever
// app.get('/users',  (req,res) =>
//     res.send('completed')
// );


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })) 
// app.use(bodyParser.json())
// app.use(express.static("views"));




//   app.listen((5000), () => {
//    (`server started at ${5000}`)
//   })

  // sudo lsof -i :8800
