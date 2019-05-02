const socket = io();

//Se cacha el evento change para poder detectar la imagen
/*
    
    Tipos MIME de imagenes:
    image/jpeg = .jpg - .jpeg
    image/png = .png
    image/gif = .gif
    
    */

$(document).on("change", "#file", function () {
    var supportedImages = ["image/jpeg", "image/png", "image/gif"];
    var image = this.files[0].type;
    var oldImage = $("#Imagen").attr("src").split("/");
    oldImage = oldImage.pop();

    if (supportedImages.indexOf(image) != -1) {
        var formData = new FormData($("#Formulario")[0]);
        formData.append("oldImage", oldImage);

        $.ajax({
            url: "upload",
            type: "post",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                loading(true, "Subiendo foto...");
            },
            success: function (res) {
                loading(false);

                if (res.status == "true") {
                    var path = "images/" + res.name;
                    $("#Imagen").attr("src", path);

                    //Lanzamos la óden de socket
                    socket.emit("update-image", res.name);
                } else {
                    alert(res.error);
                }
            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    } else {
        alert("Sube una imagen");
    }

});


//Recibimos la imagen del usuario
socket.on("update-image", function(name) {
    var path = "images/" + name;
    $("#Imagen").attr("src", path);
});