const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
