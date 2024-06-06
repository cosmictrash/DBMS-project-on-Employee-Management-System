const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
); // Enable CORS

// Set up database connection
const connection = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "sherpacodes", 
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database successfully");
});

// Define route to handle POST request from frontend
app.post("/addEmployee", function(req, res) {
    const { Name, Age, City, Position, Salary } = req.body;

    const sql =
        "INSERT INTO employees (  Name, Age, City, Position, Salary) VALUES (?, ?, ?, ?, ?)";

    const values = [Name, Age, City, Position, Salary];

    connection.query(sql, values, function(err) {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Failed to update" });
        }

        console.log("Employee added successfully");
        return res.json({ message: "Employee added successfully" });
    });
});

// Define API endpoint to retrieve all employee records
app.get("/employees", function(req, res) {
    const sql = "SELECT * FROM employees";

    connection.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Failed to update" });
        }
        console.log("Retrieved employee records successfully");
        return res.json(result);
    });
});

// Define API endpoint to update an employee record
app.put("/employee", function(req, res) {
    const { ID, Name, Age, City, Position, Salary } = req.body;

    const sql = `UPDATE employees SET Name = ?, Age = ?, City = ?, Position = ?, Salary = ? WHERE ID = ${ID}`;

    const values = [Name, Age, City, Position, Salary, ID];

    connection.query(sql, values, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Failed to update" });
        }
        console.log("Employee record updated successfully");
        return res.json({ message: "Employee record updated successfully" });
    });
});

// Define API endpoint to delete an employee record
app.delete("/employee/:ID", function(req, res) {
    const { ID } = req.params;
    console.log(ID);

    const sql = "DELETE FROM employees WHERE ID = ?";

    connection.query(sql, [ID], function(err, result) {
        if (err) return res.status(400).json({ message: "Failed to delete" });
        console.log("Employee record deleted successfully");
        return res.json({ message: "Employee record deleted successfully" });
    });
});

app.post("/login", function(req, res) {
    const { email, password } = req.body;

    const sql = "SELECT id FROM users WHERE email = ? AND password = ?;";
    const values = [email, password];

    connection.query(sql, values, function(err, result) {
        if (err || result.length == 0) return res.status(400).json({ message: "Failed to login" });
        console.log("Logged in successfully");
        res.cookie("loggedIn", "true", { httpOnly: false, sameSite: "lax" });
        return res.json({ message: "Logged in successfully" });
    });
});

app.get("/logout", function(req, res) {
    res.cookie("loggedIn", "false", {
        httpOnly: false,
        sameSite: "lax",
        overwrite: true,
    });
    return res.json({ message: "Logged Out" });
});

app.use("*", (req, res) => {
    console.log(req.url);
    return res.send("not configured");
});

app.listen(4000, function() {
    console.log("Server listening on port 4000");
});
