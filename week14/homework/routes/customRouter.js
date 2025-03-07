const express = require("express");
const router = express.Router();
const axios = require("axios");
const Todo = require("../model/Todo");
const Counter = require("../model/counter");

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
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(data);
    // Check for existing records and insert only new ones
    const savedTodos = [];

    for (const item of data) {
      const exists = await Todo.findOne({ id: item.id });
      if (!exists) {
        const nextId = await getNextSequenceValue("todo_id");

        const newTodo = new Todo({
          userId: item.userId,
          id: nextId, // Use the next sequence ID
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

router.put("/todo/:id", async (req, res) => {
  try {
    const { userId, id, title, completed } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.params.id },
      { userId, id, title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const { userId, id, title, completed } = req.body;
    const existingTodo = await Todo.findOne({ title });
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

router.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "todo deleted successfully" });
  try {
    const deletedTodo = await Todo.findOneAndDelete(id);
    console.log("deleted todo", deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
