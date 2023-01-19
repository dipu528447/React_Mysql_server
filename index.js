import express from "express"
import mysql from "mysql"
import cors from "cors"
const app=express()

// connect db
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"users"
})

app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.json("hello this is the backend ")
})
app.get("/users",(req,res)=>{
    const q="select * from  user;"
    db.query(q,(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})


app.post("/users",(req,res)=>{
    const q="insert into user (`name`,`username`,`image`,`email`,`role`,`password`,`status`) values (?)"
    const values=[req.body.name,req.body.userName,req.body.imageURL,req.body.email,req.body.role,req.body.password,req.body.status]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/users/:id",(req,res)=>{
    const userId=req.body.id;
    console.log(userId)
    const q="update users set `name`=?, `userName`=?, `image`=?, `email`=?, `role`=?, `password`=?, `status`=? where id=?";
    const values=[req.body.name,req.body.userName,req.body.imageURL,req.body.email,req.body.role,req.body.password,req.body.status]
    db.query(q,[...values, userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been updated")
    })

})

app.delete("/users/:id",(req,res)=>{
    const userID=req.params.id;
    const q= "delete from user where id=?"
    db.query(q,[userID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User Deleted Successfully")
    })
})

app.listen(8800,()=>{
    console.log("connnected to backend")
})