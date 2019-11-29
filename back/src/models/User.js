const { Schema, model } = require("mongoose");

const userSquema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true, //limpia un string de espacios extras
    unique: true,
    timestamps: true
  }
});

module.exports = model("User", userSquema);
