const express = require("express");
const app = express();
const PORT = 3000;
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const reviewsRoute = require("./routes/reviews");
const reviewsMetaRoute = require("./routes/reviews_meta");
const reviewsHelpfulRoute = require("./routes/reviews_helpful.js");
const reportReviewsRoute = require("./routes/report_reviews");

app.use("/reviews", reviewsRoute);
app.use("/reviews/meta", reviewsMetaRoute);
app.use("/reviews", reviewsHelpfulRoute);
app.use("/reviews/:review_id/report", reportReviewsRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server running");
  });
}

module.exports = app;
