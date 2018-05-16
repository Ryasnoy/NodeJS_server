const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')

const router = require('./routes/user.js')

const app = express()

app.use(router)


app.use(morgan('short'))
app.use(express.static('./public'))

function getConnection() {
 return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'lbta_mysql'
  })
}

app.get("/", (request, response) => {
  console.log("Responding to root route");
  response.send("From #ROOT")
})

//localhost:3000
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT);
})





