const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI
const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
const comments = require("./routes/api/comments");
require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/comments", comments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));