const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect to mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
require("./public/routes/htmlRoutes");

// function scrape() {

//     const $ = cheerio.load(response.data);

//     $("h3.title").each(function (i, element) {

//         var title = $(element).text();

//         var link = $(element).children().attr("href");

//         db.Articles.insert({
//             title: title,
//             link: link
//         });
//     });

// console.log(db.Articles);
// }

// Scraping the website
app.get("/techScrape", function (req, res) {

    axios.get("https://www.iflscience.com/technology/").then(function (response) {

        // db.Articles.drop();

        const $ = cheerio.load(response.data);

        $("h3.title").each(function (i, element) {

            let article = {};

            article.title = $(element).text();
            article.link = $(element).children().attr("href");

            db.Articles.create(article)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });

        console.log("aticles obtained");
    });
});

// [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.listen(3000, function () {
    console.log("App running on port " + PORT);
});

module.exports = app;