const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES//

// create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log("data from frontend",req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(200).json(newTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a specific todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id from req", id);
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//  update specific todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    console.log("id from req", id);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.status(200).json(updateTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete 
app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id from req", id);
      const updateTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
      );
      res.status(200).json("Todo was Deleted Successfully!");
    } catch (error) {
      console.error(error.message);
    }
  });

app.listen(5000, () => {
  console.log("server has started on port  5000");
});
