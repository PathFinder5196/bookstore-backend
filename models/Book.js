const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  images: {
    type: Array,
    required: false,
    default: [],
  },
  publishDate: {
    type: Date,
    required: false,
  },
  samplePDFs: {
    type: Array,
    required: false,
    default: [],
  },
  price: {
    type: Number,
    required: false,
    default: -1,
  },
});

module.exports = Book = mongoose.model("book", BookSchema);
