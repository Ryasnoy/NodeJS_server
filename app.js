// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('short'))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'lbta_mysql'
})

app.get("/", (request, response) => {
  console.log("Responding to root route");
  response.send("From #ROOT")
})

//localhost:3000
app.listen(3000, () => {
  console.log("Server is up and listening on port 3000");
})

app.get("/user/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const userID =  req.params.id
    const query = "SELECT * FROM users WHERE id = ?"
    connection.query(query, [userID], (err, rows, fields) => {
      if (err) {
        res.sendStatus(500)
        return
        // throw err
      }
      res.json(rows)
    })
})

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users"
    connection.query(query, (err, rows, fields) => {
      if (err) {
        res.sendStatus(500)
        return
        // throw err
      }
      res.json(rows)
    })

})

