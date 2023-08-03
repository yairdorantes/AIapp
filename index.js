// const express = require("express");
import express from "express";
import cors from "cors";
import { createImage } from "./OpenAI.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = 7000; // You can use any port you prefer
app.post("/image", async (req, res) => {
  const data = req.body.text;
  console.log(data);
  const response = await createImage(data);
  // console.log(response);
  res.send({ image: response });
});
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
