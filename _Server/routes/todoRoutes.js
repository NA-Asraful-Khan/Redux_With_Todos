// routes/todoRoutes.js
const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  const priority = req.query.priority;
  try {
    let query = {};
    if (
      priority &&
      (priority === "high" || priority === "medium" || priority === "low")
    ) {
      query.priority = req.query.priority;
    } else if (priority && priority === "pending") {
      query.isCompleted = false;
    } else if (priority && priority === "completed") {
      query.isCompleted = true;
    }

    const todos = await Todo.find(query);
    console.log(todos);
    res.send({ status: true, data: todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleTodo = await Todo.findByIdAndUpdate(id);

    res.send({ status: true, data: singleTodo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new todo
router.post("/", async (req, res) => {
  const { title, description, priority } = req.body;
  const newTodo = new Todo({
    title,
    description,
    isCompleted: false,
    priority,
  });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted, priority } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, isCompleted, priority },
      { new: true }
    );
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
