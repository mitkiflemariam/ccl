const express = require("express");
const { LocalStorage } = require("node-localstorage");
const fs = require("fs");
const PORT = 8080;
const apiKey = "fd3311ecfd2af752b2fea9aad18cbd0b";
const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
let storage = [];
const app = express();

app.use(express.json());

app.get("/api", async (req, res) => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");

    const jsonData = await data.json();

    storage.push(...jsonData);

    fs.writeFileSync("storage.json", JSON.stringify(storage, null, 2));

    console.log("Data successfully stored:", storage); // Log success
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/api/submit", (req, res) => {
  let body = req.body;

  let storedData = [];
  if (fs.existsSync("storage.json")) {
    storedData = JSON.parse(fs.readFileSync("storage.json"));
  }

  storedData.push(body);
  fs.writeFileSync("storage.json", JSON.stringify(storedData, null, 2));

  console.log("Data successfully stored on server:", storedData);

  res.send("Data received");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
