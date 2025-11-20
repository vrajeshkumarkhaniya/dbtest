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
        return res.status(400).json({message : "not filled" }) 
    }
       const ExtPass = await bcrypt.hash(password,10)
       
       
       const user = await User.create({
           name,
           email,
           password : ExtPass
        })
        const ExtUser = await User.findOne({email})
        if(ExtUser){
            return res.status(404).json({message : "user allresdy exists.." , ExtUser})
         }
    res.status(201).json({message : "data posted",user})
 })

 app.post("/login", async (req,res) => {
    const { email ,password} = req.body
    if (!email && !password) {
        return res.status(400).json({message : "email and password are required..."})
        
    }

    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({message : "user not found...."}) 
    }
    const ExtPass = bcrypt.compare(password,user.password)
    if (!ExtPass) {

        return res.status(404).json({message :"password not match..."})
        
    }
    res.status(201).json({ success :true ,user})

 })


 app.listen(5000, ()=>{
    console.log("server is start......")
 })