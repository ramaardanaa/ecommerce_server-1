// if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
// }
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
const router = require("./routes/router")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())

// app.get("/", (req,res) => res.status(200).json({msg:"success"}))
app.use(router)
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Example app listening at ${port}`)
// })

module.exports = app