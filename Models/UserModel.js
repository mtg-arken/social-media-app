const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { faker } = require ('@faker-js/faker');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Must be at least 6 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Must contain no spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Must be valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Must be at least 8 characters long"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:faker.image.avatar()
    },
  },
  { timestamps: true }
);

UserSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt)
  next()
})

module.exports = User = mongoose.model("User", UserSchema);
