const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// imports the API from the routes/api folder
const books = require("./routes/api/books");
const users = require("./routes/api/users");
const dbSchema = require("./models");
const Role = dbSchema.role;

// initializes the express application
const app = express();

app.use(cookieParser());

// sets up CORS for Cross-Origin-Resource-Sharing
app.use(cors());
// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// imports our database credentials (stored separately for security)
const db = require("./config/keys").mongoURI;

// initializes our database using the credentials
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Mongo Database connected"))
  .catch((err) => console.log(err));

// creates a route where we can interact with our API
app.use("/api/books", books);
app.use("/api/users", users);

/**
 * Call this function if you want to create some default roles
 */
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000;

// intializes the server and logs a message
server = app.listen(port, () => console.log(`Server running on port ${port}`));
