$(document).ready(function(){

    // Modal

    $(document).on("click", ".modal", function (e) {
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();
        }
    });

    // -> Modal

    //Se abre el panel para poder seleccionar la foto
    $(document).on("click", "#upload-image", function () {
        $("#file").click();
    });

});