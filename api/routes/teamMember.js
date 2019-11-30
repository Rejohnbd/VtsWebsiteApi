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

router.get("/active", (req, res) => {
  TeamMember.find({ user_active_status: 1 })
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

router.put("/:id/active", (req, res) => {
  TeamMember.updateOne({ _id: req.params.id }, { user_active_status: 1 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.put("/:id/inactive", (req, res) => {
  TeamMember.updateOne({ _id: req.params.id }, { user_active_status: 0 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  TeamMember.deleteOne({ _id: req.params.id })
    .exec()
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

module.exports = router;
