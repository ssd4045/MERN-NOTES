const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title: String,
  content: { type: String, required: true },
  author: String,
  timestamps: Date, //guarda automaticamente fecha y hora de creacion y/o modificacion
  date: { type: Date, default: Date.now }
});

module.exports = model("Note", noteSchema);
