const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connectDB");
const { router } = require("./router/router");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;

connectDB();

app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
