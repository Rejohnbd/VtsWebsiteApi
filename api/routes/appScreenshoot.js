const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const AppScreenshoot = require("../models/appScreenshoot_model");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, Date.now() + "-" + fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", (req, res) => {
  AppScreenshoot.find()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.get("/active", (req, res) => {
  AppScreenshoot.find({ image_active_status: 1 })
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("image_appscreenshoot"), (req, res) => {
  const file = req.file;
  if (file) {
    let imagePath = file.path;
    let pathArray = imagePath.split("public\\");

    const appScreen = new AppScreenshoot({
      _id: new mongoose.Types.ObjectId(),
      image_alt_text: req.body.image_alt_text,
      image_active_status: req.body.image_active_status,
      image_appscreenshoot: pathArray[1]
    });
    appScreen
      .save()
      .then(data => {
        return res.status(201).json({
          data: data
        });
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  } else {
    return res.status(204).json({
      message: "Nothing Send"
    });
  }
});

router.put("/:id/active", (req, res) => {
  AppScreenshoot.updateOne({ _id: req.params.id }, { image_active_status: 1 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.put("/:id/inactive", (req, res) => {
  AppScreenshoot.updateOne({ _id: req.params.id }, { image_active_status: 0 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  AppScreenshoot.deleteOne({ _id: req.params.id })
    .exec()
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

module.exports = router;
