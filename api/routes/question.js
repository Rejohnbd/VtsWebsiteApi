const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Question = require("../models/question_model");

router.get("/", (req, res) => {
  Question.find()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.get("/active", (req, res) => {
  Question.find({ question_active_status: 1 })
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  const newQuestion = new Question({
    _id: new mongoose.Types.ObjectId(),
    question_text: req.body.question_text,
    question_text_answer: req.body.question_text_answer,
    question_active_status: req.body.question_active_status
  });

  newQuestion
    .save()
    .then(data => {
      return res.status(201).json({
        data: data
      });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.put("/:id/active", (req, res) => {
  Question.updateOne({ _id: req.params.id }, { question_active_status: 1 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.put("/:id/inactive", (req, res) => {
  Question.updateOne({ _id: req.params.id }, { question_active_status: 0 })
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  Question.deleteOne({ _id: req.params.id })
    .exec()
    .then(doc => {
      return res.status(200).json(doc);
    })
    .catch(err => {
      return res.status(204).json({ error: err });
    });
});

module.exports = router;
