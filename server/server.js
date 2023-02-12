const PORT = 8000;

const express = require("express");

const app = express();

const pool = require("./db");

const cors = require("cors");

app.use(cors({ origin: "http://127.0.0.1:5173" }));

//Get all todos from our postgresql db
app.get("/users", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM app_user");
    res.json(response.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
