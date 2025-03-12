const express = require("express");
const router = express.Router();
const axios = require("axios");
const Todo = require("../model/Todo");
const Counter = require("../model/counter");
require("dotenv").config();
const todo_uri = process.env.TODO_URI;

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  return sequenceDocument.seq;
};

router.get("/api/fetch-and-save", async (req, res) => {
  try {
    // Fetch data from external API
    const { data } = await axios.get(todo_uri);
    console.log(data);
    // Check for existing records and insert only new ones
    const savedTodos = [];

    for (const item of data) {
      const exists = await Todo.findOne({ id: item.id });
      if (!exists) {
        // const nextId = await getNextSequenceValue("todo_id");

        const newTodo = new Todo({
          userId: item.userId,
          id: item.id, // Use the next sequence ID
          title: item.title,
          completed: item.completed,
        });
        await newTodo.save();
        savedTodos.push(newTodo);
      }
    }

    if (savedTodos.length > 0) {
      res.status(201).json({
        message: "Todos fetched and saved successfully",
        savedCount: savedTodos.length,
      });
    } else {
      res.status(200).json({ message: "No new todos to save" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or save data" });
  }
});

router.get("/todoes", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.post("/todo", async (req, res) => {
  try {
    const { userId, id, title, completed } = req.body;
    const existingTodo = await Todo.findOne({ id });
    if (existingTodo) {
      return res.status(400).json({ message: "Todo is already exists" });
    }
    const newTodo = new Todo({ userId, id, title, completed });
    await newTodo.save();
    res.status(201).json({ message: "Todo registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/todo/:_id", async (req, res) => {
  try {
    const { userId, id, title, completed } = req.body;
    const { _id } = req.params;

    // Validate input
    if (!title || typeof completed !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { userId, id, title, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
