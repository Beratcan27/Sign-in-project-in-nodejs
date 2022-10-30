const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "İsim girmek zorunludur"],
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: [30, "soyadı maksimum 30 karakterli olmalı"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
