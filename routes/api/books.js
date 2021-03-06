const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");

const withAuth = require("../../middleware");

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

// @route GET /api/books
// @desc Get books (public)
router.get("/", (req, res) => {
  Book.find()
    .then((info) => res.json(info))
    .catch((err) => res.status(404).json({ msg: "no books found" }));
});

// @route GET /api/books/{id}
// @desc Get book by id (public)
router.get("/:id", (req, res) => {
  Book.findById({ _id: req.params.id })
    .then((info) => res.json(info))
    .catch((err) => res.status(404).json({ msg: "no book found" }));
});

// @route POST /api/books
// @desc Create new book (public)
router.post("/", withAuth, (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  newBook.save().then((info) => res.json(info));
});

// @route DELETE /api/books
// @desc Delete book (public)
router.delete("/", withAuth, (req, res) => {
  Book.findOneAndRemove({ _id: req.body.id }).then(() => {
    res.json({ success: true });
  });
});

// @route UPDATE /api/books/update/:id
// @desc Update book (public)
router.post("/update/:id", withAuth, (req, res) => {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
      },
    },
    { new: true }
  )
    .then((info) => {
      res.json(info);
    })
    .catch((err) => res.status(400).json({ msg: "update failed" }));
});

module.exports = router;
