const mongoose = require("mongoose");

const appScreenshootSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image_alt_text: String,
  image_active_status: Boolean,
  image_appscreenshoot: String
});
module.exports = mongoose.model("AppScreenshoot", appScreenshootSchema);
