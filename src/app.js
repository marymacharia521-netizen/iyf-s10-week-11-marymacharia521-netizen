const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Netizen API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource ID" });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
