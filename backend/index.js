import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'mysql',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: '3306'
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello this is backend service")
})

app.get("/todos", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        const q = "SELECT * FROM todolist"
        connection.query(q, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
        connection.release();
    })
})

app.post("/todos", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        const q = "INSERT INTO todolist (`id`,`text`) VALUES (?)";
        const values = [req.body.id, req.body.text];
        connection.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.json("created successfully");
        })
        connection.release();
    })
})

app.delete("/todos/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        const todoId = req.params.id;
        const q = "DELETE FROM todolist WHERE id = ?";
        connection.query(q, [todoId], (err, data) => {
            if (err) return res.json(err);
            return res.json("delete successfully");
        })
        connection.release();
    })
})

app.put("/todos/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        const todoId = req.params.id;
        const q ="UPDATE todolist SET `checked` = IF (`checked` = true, false, true) WHERE id = ?";
        // const values = [req.body.text];
        connection.query(q, [todoId], (err, data) => {
            if (err) return res.json(err);
            return res.json("update successfully");
        })
        connection.release();
    })
})

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log("connect to backend11")
})