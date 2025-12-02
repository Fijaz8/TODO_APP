import express from "express";
import db from "./config/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all todos
app.get("/todo", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM todo ORDER BY id DESC");
    res.json(response.rows);
  } catch (error) {
    console.error("GET /todo error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE new todo
app.post("/topost", async (req, res) => {
  try {
    const { title, content } = req.body;

    const response = await db.query(
      "INSERT INTO todo (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    res.status(201).json({
      message: "New Todo created",
      todo: response.rows[0],
    });
  } catch (error) {
    console.error("POST /topost error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM todo WHERE id = $1", [id]);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("DELETE /todos error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE todo
app.put("/edit", async (req, res) => {
  try {
    const { id, title, content } = req.body;

    await db.query(
      "UPDATE todo SET title = $1, content = $2 WHERE id = $3",
      [title, content, id]
    );

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("PUT /edit error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
