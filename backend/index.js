import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwer123456!",
    database: "todoapp"
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello this is backend service")
})

app.get("/todos", (req, res) => {
    const q = "SELECT * FROM todos"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/todos", (req, res) => {
    const q = "INSERT INTO todos (`text`) VALUES (?)";
    const values = [req.body.text];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("created successfully");
    })
})

app.listen(8800, () => {
    console.log("connect to backend111")
})