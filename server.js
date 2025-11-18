const express = require("express");
const { connectDB } = require("./db");

const User = require("./model") 
const bcrypt = require("bcryptjs")
const app = express()

 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
 connectDB();

 app.post("/regi", async(req,res)=>{
    const{name,email,password}=req.body

    if (!name || !email || !password) {
        res.status(400).json({message : "not filled" })
        
    }
    const extuser = await bcrypt.hash("password",10)

    const user = await User.create({
        name,
        email,
        password : extuser
    })
    res.status(201).json({message : "data posted",user})
 })


 app.listen(5000, ()=>{
    console.log("server is start......")
 })