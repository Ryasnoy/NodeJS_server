// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('short'))

app.get("/", (request, response) => {
  console.log("Responding to root route");
  response.send("From #ROOT")
})

//localhost:3000
app.listen(3000, () => {
  console.log("Server is up and listening on port 3000");
})

app.get("/users", (req, res) => {
  const user = {
    first_name: "Steve",
    last_name: "Jobs"
  }

  res.json(user)

  res.send("Nodemon auto updates when I save this file")
})