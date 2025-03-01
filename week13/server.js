const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/example", (req, res) => {
  res.send("This is an example route");
});

app.post("/submit", (req, res) => {
  let body = req.body;
  res.send("Data received");
});

app.get("/users/:userId", (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Data fetched successfully" });
});

app.post("/api/data", (req, res) => {
  res.json({ message: "Data saved successfully" });
});

//Fetching External Data with Axios
app.get("/api/external", async (req, res) => {
  try {
    const response = await axios.get("https://api.example.com/data");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
