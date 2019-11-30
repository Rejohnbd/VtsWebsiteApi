const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Template = require("../models/template_model");

router.get("/", (req, res) => {
  Template.findOne()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/contact", (req, res) => {
  Template.updateOne({
    $set: {
      contact_number_one: req.body.contact_number_one,
      contact_number_two: req.body.contact_number_two
    }
  })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.post("/email", (req, res) => {
  Template.updateOne({
    $set: {
      contact_email_one: req.body.contact_email_one,
      contact_email_two: req.body.contact_email_two
    }
  })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.post("/address", (req, res) => {
  Template.updateOne({
    $set: {
      contact_address: req.body.contact_address
    }
  })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.post("/social", (req, res) => {
  Template.updateOne({
    $set: {
      facebook_link: req.body.facebook_link,
      twitter_link: req.body.twitter_link,
      linkedin_link: req.body.linkedin_link
    }
  })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

module.exports = router;
