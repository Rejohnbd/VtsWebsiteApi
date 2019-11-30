const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question_text: String,
  question_text_answer: String,
  question_active_status: Boolean
});
module.exports = mongoose.model("Question", questionSchema);
