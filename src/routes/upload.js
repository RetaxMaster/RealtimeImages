const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const db = require("../database");
const helpers = require("../lib/helpers");

router.post("/upload", async (req, res) => {
    let data = {};
    let image = req.files.image;
    let body = req.body;
    let type = image.type;
    let supportedImages = ["image/jpeg", "image/png", "image/gif"];
    let oldImage = body.oldImage;

    function getImageName(image) {
        let extension = image.split(".").pop();
        let randomString = helpers.getRandomString(10);
        return randomString + "." + extension;
    }

    if (supportedImages.indexOf(type) != -1) {
        let name = getImageName(image.name);
        let pathToImages = "../public/images/" + name;
        let newPath = path.join(__dirname, pathToImages);

        await db.query("UPDATE images SET image = ? WHERE id = 1;", [name]);

        //Eliminamos la imagen antigua
        try {
            oldImage = "../public/images/" + oldImage;
            let oldPath = path.join(__dirname, oldImage);
            
            if (fs.statSync(oldPath).isFile()) {
                fs.unlinkSync(oldPath);
            }
        } catch (error) {
            console.log("El archivo no existe, este es el mensaje: ", error);
        }

        //Subimos la imagen al servidor
        fs.renameSync(image.path, newPath);

        data.status = "true";
        data.name = name;
    } else {
        data.status = "false";
        data.error = "Por favor, sube una imagen";
    }
    
    res.send(data);
});

module.exports = router;