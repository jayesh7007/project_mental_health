const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "jayesh@viit07",
    database: "Mental_health"
})

con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);"
    con.query(q, [name, email, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const email1 = req.body.email1;
    const password1 = req.body.password1;
    const q = "SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(q, [email1, password1], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG EMAIL OR PASSWORD!"})
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})