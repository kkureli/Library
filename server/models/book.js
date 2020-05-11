const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // id will be created automatically by MongoDB
  name: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model("Book", bookSchema);
