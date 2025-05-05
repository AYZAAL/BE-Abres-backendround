const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  { timestamps: true }
);

// ✅ Correct model export
module.exports = mongoose.model("User", userSchema);
