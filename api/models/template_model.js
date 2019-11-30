const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  contact_number_one: String,
  contact_number_two: String,
  contact_email_one: String,
  contact_email_two: String,
  contact_address: String,
  facebook_link: String,
  twitter_link: String,
  linkedin_link: String
});
module.exports = mongoose.model("Template", templateSchema);
