const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 3000
const connectDB = require("./configs/db.js")
connectDB.connectDB()

const userRoutes = require("./routes/userRoutes.js")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors());


app.use("/api/users", userRoutes)

app.get("/", (req,res) => {
  res.send("Server is running")
})

app.listen(port, ()=> console.log(`Server running on port ${port}`))