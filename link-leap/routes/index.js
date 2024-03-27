var express = require("express");
var router = express.Router();
const link = require("../model/link");
const Link = require("../model/link");

function generateCode(url) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqerstuvwxyz123456789";
  for (let e = 0; e < 5; e++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

router.get("/:code/stats", async (req, res, next) => {
  const code = req.params.code;
  const result = await Link.findOne({
    where: {
      code: code,
    },
  });

  if (!result) return res.statusCode(404);
  res.render("stats", result.dataValues);
});

router.get("/:code", async (req, res, next) => {
  const code = req.params.code;

  const result = await Link.findOne({
    where: {
      code: code,
    },
  });

  if (!result) return res.statusCode(404);

  result.hits++;
  await result.save();

  res.redirect(result.url);
});

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

  res.render("stats", result.dataValues);
});
