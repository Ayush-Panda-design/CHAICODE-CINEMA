import dotenv from "dotenv";
dotenv.config();

import { dirname, join, resolve } from "path"; 
import { fileURLToPath } from "url";

import app from "./src/app.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;


app.get("/", (req, res) => {
    const filePath = resolve(__dirname, "index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Could not find index.html. Check terminal logs.");
        }
    });
});

app.get("/login", (req, res) => {
    res.sendFile(resolve(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(resolve(__dirname, "register.html"));
});


app.listen(port, () => {
    console.log(`🎬 Cinema server running on http://localhost:${port}`);
    console.log(`📂 Serving files from: ${__dirname}`);
});