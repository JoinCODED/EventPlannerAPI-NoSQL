const express = require("express");
const connectDB = require("./db/config");
const eventRoutes = require("./apis/events/routes");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);

const PORT = 8080;

connectDB();

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
