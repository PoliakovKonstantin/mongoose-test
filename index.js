const Book=require('./schema.js')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({ path: 'C:/mongoose-express/mongoose_connect.env' })
mongoose.connect(process.env.connect,{ useNewUrlParser: true })

const express=require('express')
const FormData=require('express-form-data')
const app=express()
const formData = require("express-form-data");
app.use(formData.parse());
app.get('/api/books', (req,res)=>{
    Book.find((err,docs)=>{
        try{
            if(err) {throw err}
            res.send(docs)
        }
        catch (err) {
            console.error(err)
        }
        
    })
})

app.get('/api/books/:id', (req,res)=>{
    const {id}=req.params
    Book.findById(id,(err,doc)=>{
        try{
            if(err) {throw err}
            if(!doc) res.status(404)
            else if (doc) res.send(doc)
        }
        catch (err) {
            console.error(err)
        }
        
    })
})

app.put('/api/books/:id',(req,res)=>{
    const {id}=req.params
    const {title,description,authors,favorite,fileCover,fileName}=req.body
    Book.findByIdAndUpdate(id,{title,description,authors,favorite,fileCover,fileName},(err,doc)=>{
        try{
            if(err) {throw err}
            if(!doc) res.status(404)
            else if (doc) res.send('ok!')
        }
        catch (err) {
            console.error(err)
        }
    })
})

app.post('/api/books',(req,res)=>{
    const {title,description,authors,favorite,fileCover,fileName}=req.body
    Book.create({title,description,authors,favorite,fileCover,fileName},(err)=>{
        if (err) throw err
    })
    Book.find({title,description,authors,favorite,fileCover,fileName},(err,doc)=>{
        if (err) throw err
        res.send(doc)
    })
})

app.delete('/api/books/:id',(req,res)=>{
    const {id}=req.params
    Book.findByIdAndDelete(id,(err,doc)=>{
        try{
            if (err) throw err
            if(doc) res.send('ok')
        }
        catch(e) {
            console.error(e)
        }
    })
})

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('Server is listening on port '+PORT)
})