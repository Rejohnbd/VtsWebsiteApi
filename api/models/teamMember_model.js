const mongoose = require("mongoose");

const teamMemberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  team_member_name: String,
  facebook_link: String,
  twitter_link: String,
  linkedin_link: String,
  user_active_status: Boolean,
  image_team_member: String
});
module.exports = mongoose.model("TeamMember", teamMemberSchema);
