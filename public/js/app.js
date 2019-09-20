$(function () {

    $(document).on("click", ".save-article", function () {
        let id = $(this).attr("articleID");
        let article = {};

        article.title = $(this).attr("articleTitle");
        article.link = $(this).attr("articleLink");

        $.ajax({
            method: "POST",
            url: "/savedArticles/:" + id,
            data: article
        })
        .catch(function (err) {
            console.log(err);
        });

        $(this).text("Saved!");
    });

    $(document).on("click", ".remove-article", function () {
        let id = $(this).attr("articleID");

        $.ajax({
            method: "DELETE",
            url: "/savedArticles/" + id,
        })
        .catch(err => {
            console.log(err);
        });
    });
});