// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('short'))
app.use(express.static('./public'))

function getConnection() {
 return mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'lbta_mysql'
})
}

app.post("/user_create", (req, res) => {
  
  console.log("Try to create a new user..." + req.body.create_first_name)

  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const query = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"

  getConnection().query(query, [firstName, lastName], (err, results, fields) => {
    if (err) {
      res.sendStatus(500)
      return
    }

    res.sendStatus(200)
    console.log("Inserted a new user with id: " + results)

  })
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
    getConnection().query(query, [userID], (err, rows, fields) => {
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
    getConnection().query(query, (err, rows, fields) => {
      if (err) {
        res.sendStatus(500)
        return
        // throw err
      }
      res.json(rows)
    })

})

