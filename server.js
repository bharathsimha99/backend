const express=require('express')
const dotenv=require('dotenv')
const mongoose = require('mongoose')
const userModel = require('./Model/userModel')

const app=express()
app.use(express.json())
dotenv.config()


//DB connection
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL).then((db,err)=>{
    if (err) throw err
    else{
        console.log("DB is connected")
    }
})

//Api Routes

app.post('/addData',async(req,res)=>{
    try{
       await userModel.create(req.body)
       return res.status(400).json({message:'Data is added in DB'})
    }
    catch(e){
        console.log(e)
    }
})

app.get('/',async(req,res)=>{
    try{
const data = await userModel.find({})
return res.status(200).json({data})
    }
    catch(e){
        console.log(e)
    }
})

app.patch('/updateData/:id',async(req,res)=>{
    try{
      await userModel.findByIdAndUpdate(req.params.id,req.body) 
      return res.status(400).json({message:"Data is Updated"})
    }
    catch(e){
        console.log(e)
    }
})

app.delete('/:id',async(req,res)=>{
    try{
        const data = await userModel.findByIdAndDelete(req.params.id)
        return res.status(400).json({message:"Deleted Data",data})
    }
    catch(e){
        console.log(e)
    }
})

//PORT listening
app.listen(8000,()=>{
    console.log("Listening PORT 8000")
})