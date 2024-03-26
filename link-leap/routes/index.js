var express = require("express");
var router = express.Router();
const link = require("../model/link");

function generateCode(url) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqerstuvwxyz123456789";
  for (let e = 0; e < 5; e++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Link-leap" });
});

module.exports = router;

router.post("/new", async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const result = await link.create({
    url,
    code,
  });

  res.send("http://localhost:3000/" + code);
});
