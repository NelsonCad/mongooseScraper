const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

// Use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect to mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
require("./public/routes/htmlRoutes")(app);

// Scraping the website
app.get("/techscrape", function (req, res) {

    axios.get("https://www.iflscience.com/technology/").then(function (response) {

        // db.Article.drop();

        const $ = cheerio.load(response.data);

        $("h3.title").each(function (i, element) {

            let article = {};

            article.title = $(this).text();
            article.link = $(this).children().attr("href");

            db.Article.create(article)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });

        res.redirect("/");

    }).catch(function (err) {
        console.log(err);
    });
});

app.get("/spacescrape", function (req, res) {

    axios.get("https://www.iflscience.com/space/").then(function (response) {

        // db.Article.drop();

        const $ = cheerio.load(response.data);

        $("h3.title").each(function (i, element) {

            let article = {};

            article.title = $(this).text();
            article.link = $(this).children().attr("href");

            db.Article.create(article)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });

        res.redirect("/");

    }).catch(function (err) {
        console.log(err);
    });
});

app.get("/physicsscrape", function (req, res) {

    axios.get("https://www.iflscience.com/technology/").then(function (response) {

        

        const $ = cheerio.load(response.data);

        $("h3.title").each(function (i, element) {

            let article = {};

            article.title = $(this).text();
            article.link = $(this).children().attr("href");

            db.Article.create(article)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });

        res.redirect("/");

    }).catch(function (err) {
        console.log(err);
    });
});

app.get("/dbClear", function (req, res) {
    db.Article.deleteMany({}).then(function () {
        res.redirect("/");
    }).catch(function (err) {
        console.log(err);
    });

})

// [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.listen(8000, function () {
    console.log("App running on port " + PORT);
});

module.exports = app;