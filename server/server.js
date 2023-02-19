const PORT = 8000;

const express = require("express");

const app = express();

const pool = require("./db");

const cors = require("cors");

const { v4: uuidv4, v4 } = require("uuid");

app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(express.json());

//Get all todos from our postgresql db
app.get("/users", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM app_users");
    res.json(response.rows);
  } catch (error) {
    console.error(error);
  }
});

app.post("/users/post", async (req, res) => {
  const { username, title, date } = req.body;
  console.log(username, title, date);
  const id = uuidv4();
  console.log(id, username, title, date);

  const response = await pool.query(
    "INSERT INTO app_users VALUES ($1, $2, $3, $4)",
    [id, username, title, date]
  );

  res.json({ id, username, title, date });
});

app.delete("/users/:id", async (req, res) => {
  console.log(req.body);
  try {
    const { userId } = req.body;
    console.log(userId);

    const response = await pool.query("DELETE FROM app_users WHERE id = $1", [
      userId,
    ]);

    res.json(userId);
  } catch (error) {
    console.log(userId);
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
