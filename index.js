const express = require("express")
const cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./routes/userRoutes")
// const {profileRouter} = require("./routes/profileRoutes")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
// app.use("/profile",profileRouter)


app.listen(4500,async()=>{
    try{
        await connection
        console.log("connected to the DB")
    }catch(err){
        console.log("can not connect to DB")
        console.log(err)
    }
    console.log("server is running on port 4500")
})