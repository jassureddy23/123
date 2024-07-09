const express=require('express')
const mysql=require('mysql2')
 const cors=require('cors')
const app=express()

 app.use(cors())
 app.use(express.json())

 const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'aits_rajampet'
 })

 db.connect(function(error){
    if(error){
        console.log("connection unsec");
        return;
    }
    else{
        console.log("connection sucessfull"); 
    }
 })
 app.get('/get_users',function(req,res){
    db.query('SELECT * FROM employees',function(err,result){
        req.json(result);
    })
 })
 app.post('/add-emp', function(req,res){
    const {empid,name,salary}=req.body;
    console.log(req.body);
    const insertquery='insert into employees(employee_id,name,salary)values(?,?,?)'
    db.query(insertquery,[empid,name,salary],function(err,result){
        if(err){
            console.log(err.sqlMessage);
            res.status(500).send('Error inserting data');
            return;
        }
        else{
            res.json({text:'sucess is inserting'})
        }
    })

 })
 app.listen(8085)