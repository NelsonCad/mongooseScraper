const db = require("../../models");

module.exports = function (app) {

    app.get("/", function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {

                res.render("index", {
                    article: dbArticle
                });
            })
            .catch(err => {
                console.log(err)
            });
    });

    app.get("/saved", function (req, res) {
        db.savedArticle.find({})
            .then(dbsavedArticle => {
                res.render("saved", {
                    article: dbsavedArticle
                });
            })
            .catch(err => {
                console.log(err)
            });
    });

    // app.delete("/saved", function (req, res) {
    //     db.savedArticle.find({})
    //         .then(dbsavedArticle => {
    //             res.render("saved", {
    //                 article: dbsavedArticle
    //             });
    //         });
    // });
};