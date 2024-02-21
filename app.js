let express = require("express");
let app = express();
const port = 3000;

let postgres = require("@vercel/postgres");

app.get("/", async (request, response) => {
  createNotes();
  const { rows } = await postgres.sql`SELECT * FROM notes`;

  return response.json(rows);
});

app.get("*", (request, response) => {
  return response.status(404).json({ message: "Sorry. Page not found" });
});

async function createNotes() {
  await postgres.sql`CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
      content VARCHAR(255)
    ) `;
}

module.exports = app;
