const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const TeamMember = require("../models/teamMember_model");

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
  TeamMember.find()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("image_team_member"), (req, res) => {
  const file = req.file;
  if (file) {
    let imagePath = file.path;
    let pathArray = imagePath.split("public\\");

    const newTeamMember = new TeamMember({
      _id: new mongoose.Types.ObjectId(),
      team_member_name: req.body.team_member_name,
      facebook_link: req.body.facebook_link,
      twitter_link: req.body.twitter_link,
      linkedin_link: req.body.linkedin_link,
      user_active_status: req.body.user_active_status,
      image_team_member: pathArray[1]
    });
    newTeamMember
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
