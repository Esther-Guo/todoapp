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
    const q = "SELECT * FROM todolist"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/todos", (req, res) => {
    const q = "INSERT INTO todolist (`id`,`text`) VALUES (?)";
    const values = [req.body.id, req.body.text];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("created successfully");
    })
})

app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const q = "DELETE FROM todolist WHERE id = ?";
    db.query(q, [todoId], (err, data) => {
        if (err) return res.json(err);
        return res.json("delete successfully");
    })
})

app.put("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const q ="UPDATE todolist SET `checked` = IF (`checked` = true, false, true) WHERE id = ?";
    // const values = [req.body.text];
    db.query(q, [todoId], (err, data) => {
        if (err) return res.json(err);
        return res.json("update successfully");
    })
})

app.listen(8800, () => {
    console.log("connect to backend")
})