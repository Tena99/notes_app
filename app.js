let express = require("express");
let app = express();

let postgres = require("@vercel/postgres");

app.get("/", async (request, response) => {
  createTables();
  const { rows } = await postgres.sql`SELECT * FROM notes`;

  return response.json(rows);
});

app.get("/:user", async (request, response) => {
  createTables();
  const { user } = request.params;

  const { rows } =
    await postgres.sql`SELECT * FROM notes INNER JOIN users ON notes."userID" = users.id WHERE users.name = ${user}`;

  return response.json(rows);
});

app.get("/:user/:noteID", async (request, response) => {
  createTables();

  const { user, noteID } = request.params;

  const { rows } =
    await postgres.sql`SELECT * FROM notes INNER JOIN users on notes."userID" = users.id WHERE notes.id = ${noteID} AND users.name = ${user}`;

  return response.json(rows);
});

app.get("*", (request, response) => {
  return response.status(404).json({ message: "Sorry. Page not found" });
});

async function createTables() {
  await postgres.sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255)
)`;

  await postgres.sql`CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content VARCHAR(255),
      "userID" INTEGER REFERENCES users(id)
    ) `;
}

module.exports = app;
