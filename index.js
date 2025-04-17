const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())

app.use(express.static("public"))

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname +"/public/index.html")
// })

const JWT_SECRET = "secretKey"
let token = ""

app.post("/signin", (req,res)=>{

    console.log(req.body.userName)

    token = jwt.sign({
        username: req.body.userName,
        password:  req.body.password,
    },JWT_SECRET)
    console.log(token)
    res.json({
        message : "this is good",
        token: token,
    })
})

app.listen(3000, (req,res)=>{
    console.log("the app is running in the port 3000 ")
})