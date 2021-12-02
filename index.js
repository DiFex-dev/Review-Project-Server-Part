const express = require("express");
const bodyParser = require("body-parser");
const cors= require("cors");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;

if (process.env.NODE_env === "production"){
    app.use(express.static("../client/build"));
    app.get("*", (req, res) =>{
        req.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
};

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Vlad2002Vlad",
database: "reviews",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))



app.get("/api/get", (req,res) =>{
const sqlSelect ="SELECT * FROM reviewbd";
db.query(sqlSelect, (err,result)=>{
res.send(result);
})
});



app.get("/api/get", (req,res) =>{
    const sqlSelect ="SELECT * FROM reviewcomm";
    db.query(sqlSelect, (epp,repult)=>{
    res.send(repult);
    })
    });

    
app.post("/api/insert", (req,res) =>{
const name = req.body.name;
const review = req.body.review;
const sqlInsert ="INSERT INTO reviewbd (`name`, `review`) VALUES (?,?)";
db.query(sqlInsert, [name, review], (err,result)=>{
console.log(result);
});
});

app.post("/register", (req,res) =>{

    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        db.query("INSERT INTO users(username, password) VALUES (?,?)",
    [username, hash],
    (err, result) =>{
        console.log(err);
    }
    );
    })
});

app.post("/login", (req,res) =>{
     
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM username = ?",
    username,
    (err, result) =>{
        if(err) {
            res.send({err: err});
        }

        if(result.length > 0){
        bcrypt.compare(password, result[0].password, (error, response)=>{
            if (response){
                res.send(result)
            } else{
                res.send({message: "Wrong username/password combination!"});
            }
        })
        } else{
            res.send({message: "User doesn't exist"});
        }
    }
);
});

app.delete("/api/delete/:name", (req, res) =>{
    const namee = req.params.name;
    const sqlDelete ="DELETE FROM reviewbd WHERE name = ?";
    db.query(sqlDelete, namee, (err, result)=>{
        if(err) console.log(err);
    });
});

app.put("/api/update", (req, res) =>{
    const namee = req.body.name;
    const revieww = req.body.review;
    const sqlUpdate ="UPDATE reviewbd SET review = ? WHERE name = ?";
    db.query(sqlUpdate, [revieww, namee], (err, result)=>{
        if(err) console.log(err);
    });
});

app.put("/api/comment", (req, res) => {
    const comm = req.body.reviewComment;
    const namecomm = req.body.name;
    const sqlCommenting = "UPDATE reviewcomm SET reviewComment = ? WHERE name = ?";
    db.query(sqlCommenting, [comm, namecomm], (epp,repult) =>{
        if (epp) console.log(epp)
        console.log(repult);
    });
});

/*const reviewbdPromise = new Promise((resolve,reject) =>{
    connection.query(sql2, function(err, cResult) {
       if (err) return reject( err);
       resolve( cResult.insertId);
   });
 })

 const reviewcommPromise = new Promise((resolve,reject) =>{
     connection.query(sql3, function(err, aResult) {
         if (err) return reject( err);
         resolve(aResult.insertId);
     });
 })
 Pomise.all([reviewbdPromise,reviewcommPromise])
 .then(([reviewid,commid]) =>{
    var sql4 = "UPDATE address set reviewid = " + reviewid + " WHERE (commid = " + commid + ")";

   connection.query(sql4, function(err, uRes) {
       console.log("Address updated " + commid + " " + reviewid);
   });
 
 })
 */

 


app.listen(port, (err) =>{
    if (err) return console.log(err);
console.log("running on port 3001");
});