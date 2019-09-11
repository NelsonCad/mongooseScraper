import Axios from "axios";

$(document).on("ready", function () {

    $(document).on("click", ".dbClear", function () {

        Axios.delete("/dbClear")

    })


});