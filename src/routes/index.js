const express = require('express');
const router = express.Router();

const db = require("../database");

router.get("/" , async (req, res) => {

    let image = await db.query("SELECT image FROM images WHERE id = 1;");
    image = image[0].image;
    res.render("home", { image });
});

module.exports = router;