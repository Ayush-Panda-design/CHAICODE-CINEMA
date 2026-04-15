import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import app from "./src/app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;

// ✅ Serve static frontend files
app.use(express.static(__dirname));

// OR if files are inside a folder like /public:
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.listen(port, () => {
  console.log(`🎬 Cinema server running on port ${port}`);
});