// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({extended: false}))

// Connection pool to DB
const pool = mysql.createPool({
    connectionLimit: 10,
     host: 'localhost',
     user: 'root',
     database: 'lbta_mysql'
})

module.exports = router

router.get("/user/:id", (req, res) => {
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

router.get("/users", (req, res) => {
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


router.post("/user_create", (req, res) => {
  
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

function getConnection() {
    return pool
}