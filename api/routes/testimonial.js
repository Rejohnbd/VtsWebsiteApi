const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Testimonial = require("../models/testimonial_model");

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
  Testimonial.find()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.get("/active", (req, res) => {
  Testimonial.find({ comment_active_status: 1 })
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("image_client_comment"), (req, res) => {
  const file = req.file;
  if (file) {
    let imagePath = file.path;
    let pathArray = imagePath.split("public\\");

    const newTestimonial = new Testimonial({
      _id: new mongoose.Types.ObjectId(),
      client_name: req.body.client_name,
      client_comment: req.body.client_comment,
      twitter_link: req.body.twitter_link,
      comment_active_status: req.body.comment_active_status,
      image_client_comment: pathArray[1]
    });
    newTestimonial
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

module.exports = router;
