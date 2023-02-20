const PORT = 8000;
const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(express.json());

//Get all todos from our postgresql db
app.get("/users", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    res.json(response.rows);
  } catch (error) {
    console.error(error);
  }
});

app.post("/users/post", async (req, res) => {
  const { username } = req.body;

  const response = await pool.query(
    "INSERT INTO users (username) VALUES ($1)",
    [username]
  );

  res.json({ username });
});

app.delete("/users/:id", async (req, res) => {
  console.log(req.body);
  try {
    const { userId } = req.body;

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.json(userId);
  } catch (error) {
    console.log(userId);
    console.log(error);
  }
});

//--------------------------------------------------------------------------
//Albums

//1- Albums get
app.get("/albums?:userId", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);

    const response = await pool.query(
      "SELECT * FROM albums WHERE user_id = $1",
      [userId]
    );

    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

//2- Albums post
app.post("/albums", async (req, res) => {
  const { title, user_id } = req.body;
  console.log(title, user_id);

  const response = await pool.query(
    "INSERT INTO albums (title, user_id) VALUES ($1,$2)",
    [title, user_id]
  );

  res.json(response.rows);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
