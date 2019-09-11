$(function () {

    $(document).on("click", ".save-article", function () {
        let id = $(this).attr("value")

        $.ajax({
            method: "POST",
            url: "/savedarticles/" + id
        }).then(function (data) {
            console.log(data)
        }).catch(function (err) {
            console.log(err);
        })
    })

})