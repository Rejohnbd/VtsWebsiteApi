const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  client_name: String,
  client_organization_name: String,
  client_comment: String,
  comment_active_status: Boolean,
  image_client_comment: String
});
module.exports = mongoose.model("Testimonial", testimonialSchema);
