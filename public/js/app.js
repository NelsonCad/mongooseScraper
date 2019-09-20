$(function () {

    $(document).on("click", ".save-article", function () {
        let id = $(this).attr("articleID");
        let article = {};

        article.title = $(this).attr("articleTitle");
        article.link = $(this).attr("articleLink");

        console.log(article);

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

});