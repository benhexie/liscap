require("dotenv").config(`${__dirname}/../.env`);
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

async function main() {
  app.get("/", (req, res) => {
    res.send("Hello from liscap");
  });

  app.get("/liscap.min.js", (req, res) => {
    res.sendFile(__dirname + "/dist/liscap.min.js");
  });

  app.all("*", (_, res) => {
    res.redirect("/");
  });

  const listener = app.listen(process.env.PORT || 80, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}

main().catch((err) => {
  console.error(err.message);
});
