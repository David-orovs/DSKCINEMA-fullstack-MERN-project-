const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_1eCSmJTsYJAMMWG3Wag7hgxd00SOzye1KL");
var app = express();
const mongoose = require("mongoose");
const db = require('./config/keys').mongoURI;


mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true  }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});



app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/booked', require('./routes/booked'));
app.use('/charge', require('./routes/charge'));

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5010

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});