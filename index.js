let express = require("express");
let app = express();
const port = 3000;

app.get("/", (request, response) => {
  return response.json({ message: "Welcome to our note-taking app!" });
});

app.get("*", (request, response) => {
  return response.status(404).json({ message: "Sorry. Page not found" });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app