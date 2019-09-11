const db = require("../../models");

module.exports = function (app) {

    app.get("/", function (req, res) {

        db.Article.find({}).then(function (dbArticle) {

            res.render("index", {
                article: dbArticle
            })
        })
    });


};