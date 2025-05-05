// public_associates.js
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    return res.status(200).json("well done");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
