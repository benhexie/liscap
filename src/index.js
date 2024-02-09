const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/liscap.min.js", (req, res) => {
  res.sendFile(__dirname + "/dist/liscap.min.js");
});

const listener = app.listen(8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
