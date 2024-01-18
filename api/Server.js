require("dotenv").config();

const express = require("express");
const app = express();

const router = require("./src/routes/index");

const OPTIK_PORT = process.env.OPTIK_API_PORT;
const PERUSAHAANA_PORT = process.env.PERUSAHAANA_API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    status: "Success",
    error: false,
    message: "Welcome to my API",
  });
});

app.listen(OPTIK_PORT, () => {
  console.log(`Optik API Server is running on port ${OPTIK_PORT}`);
});

app.listen(PERUSAHAANA_PORT, () => {
  console.log(`Perusahaan A API Server is running on port ${PERUSAHAANA_PORT}`);
});
