const express = require("express");
const customRoute = require("./routes/customRouter");
const connectDB = require("./dbconnect");
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(customRoute);

async function startApi() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Express server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApi();
