$(window).ready(function () {
    document.title = "Inicio de Sesion";
    $("#menu").hide();
    $("#menu1").hide();
    reloj();
    setInterval(reloj, 1000);
});

$(document).ready(function () {
    $("#seleccionado").on('click', function () {
        console.log('idioma');
        if ($("#menu").css('display') != 'none') {
            $("#menu").toggleClass("slidedown").animate({ left: '1%' }, 'slow');
            $("#ayuda").animate({ left: '60px' }, 'slow');
            setTimeout(() => {
                $("#menu").hide().toggleClass("slidedown");
            }, 600);
        } else {
            $("#menu").show().toggleClass("slidedown").animate({ left: '60px' }, 'slow');
            $("#ayuda").animate({ left: '110px' }, 'slow');
            setTimeout(() => {
                $("#menu").toggleClass("slidedown");
            }, 600);
        }
    });
    $("#menu").on('click', function () {
        $("#menu").toggleClass("slideup").animate({ left: '1%' }, 'slow');
        $("#ayuda").animate({ left: '60px' }, 'slow');
        setTimeout(() => {
            const primario = $("#primario").attr('src');
            const secundario = $("#secundario").attr('src');
            const classprimario = $("#primario").attr('class');
            const classsecundario = $("#secundario").attr('class');
            $("#primario").attr("src", secundario);
            $("#secundario").attr("src", primario);
            $("#primario").attr("class", classsecundario);
            $("#secundario").attr("class", classprimario);
            $("#menu").hide().toggleClass("slideup");
        }, 600);
    });
    $("#seleccionado1").on('click', function () {
        console.log('idioma');
        if ($("#menu1").css('display') != 'none') {
            $("#menu1").toggleClass("slidedown").animate({ top: '1%' }, 'slow');
            setTimeout(() => {
                $("#menu1").hide().toggleClass("slidedown");
            }, 600);
        } else {
            $("#menu1").show().toggleClass("slidedown").animate({ top: '50px' }, 'slow');
            setTimeout(() => {
                $("#menu1").toggleClass("slidedown");
            }, 600);
        }
    });
    $("#menu1").on('click', function () {
        $("#menu1").toggleClass("slideup").animate({ top: '1' }, 'slow');
        setTimeout(() => {
            const primario = $("#primario1").attr('src');
            const secundario = $("#secundario1").attr('src');
            const classprimario = $("#primario1").attr('class');
            const classsecundario = $("#secundario1").attr('class');
            $("#primario1").attr("src", secundario);
            $("#secundario1").attr("src", primario);
            $("#primario1").attr("class", classsecundario);
            $("#secundario1").attr("class", classprimario);
            $("#menu1").hide().toggleClass("slideup");
        }, 600);
    });
    $("#show").change(function () {
        console.log('show');
        if ($("#pass").attr('type') != 'text') {
            $("#pass").attr('type', 'text')
        } else {
            $("#pass").attr('type', 'password')
        }
    });
    $("#olvidar").on('click', function () {
        console.log('olvidar');
    });
    $("#ayuda").on('click', function () {
        console.log('ayuda');
    });
    $("#ayuda1").on('click', function () {
        console.log('ayuda');
    });
    $("#boton").on('click', function () {
        if ($('#CI').val() !== "" && $('#pass').val() !== "") {
            let CI = $('#CI').val();
            let pass = $('#pass').val();
            $("#pass").removeClass("error");
            $("#CI").removeClass("error");
            $.ajax({
                url: 'view/login/Login.php',
                type: 'POST',
                data: {
                    CI: CI,
                    pass: pass,
                    beforeSend: function () {
                        console.log("login");
                    }
                },
                success(respuesta) {
                    if (respuesta === "Existe Cuenta") {
                        $.ajax({
                            url: 'view/login/Seguridad.php',
                            type: 'GET',
                            beforeSend: function () {
                                console.log("Seguridad");
                            },
                            success(respuesta) {
                                $cantidad = respuesta;
                                if ($cantidad <= '2') {
                                    $cantidad = $cantidad + 1;
                                    Swal.fire({
                                        title: 'Ingrese Pregunta y Respuesta de Seguridad Nº ' + respuesta,
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false',
                                        showDenyButton: 'true',
                                        confirmButtonText: 'Confirmar',
                                        denyButtonText: 'Cancelar',
                                        confirmButtonColor: '#13af01',
                                        denyButtonColor: '#b91d1d',
                                        showCloseButton: 'true',
                                        html:
                                            '<div class="Swal group mx-auto">' +
                                            '<input type="text" id="Pregunta" class="input" required>' +
                                            '<span class="highlight"></span>' +
                                            '<span class="bar"></span>' +
                                            '<label>Pregunta</label>' +
                                            '</div>' +
                                            '<div class="Swal group mx-auto">' +
                                            '<input type="number" id="Respuesta" class="input" required>' +
                                            '<span class="highlight"></span>' +
                                            '<span class="bar"></span>' +
                                            '<label>Respuesta</label>' +
                                            '</div>'

                                    }).then((result) => {
                                        if (result.isConfirmed && $('#Pregunta').val() !== "" && $('#Respuesta').val() !== "") {
                                            let Pregunta = $('#Pregunta').val();
                                            let Respuesta = $('#Respuesta').val();
                                            $.ajax({
                                                url: 'view/login/InsertSeguridad.php',
                                                type: 'POST',
                                                data: {
                                                    Pregunta: Pregunta,
                                                    Respuesta: Respusta,
                                                    beforeSend: function () {
                                                        console.log("Insert Seguridad");
                                                    }
                                                },
                                                success(respuesta) {

                                                },
                                                failure(respuesta) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'No se Pudo conectar con el servidor',
                                                        text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                                        confirmButtonText: 'Entendido'
                                                    });
                                                }
                                            });
                                        } else if (result.isConfirmed) {
                                            console.log('Vacio');
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Uno o ambos de los campos se Encuantra Vacio',
                                                background: '#f1f1f1',
                                                backdrop: 'true',
                                                allowOutsideClick: 'false',
                                                allowEnterKey: 'false',
                                                timer: '3000'
                                            });
                                        } else if (result.isDenied) {
                                            console.log('Cancel');
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Es necesario que ingreses la Pregunta de Seguridad y su Respuesta',
                                                background: '#f1f1f1',
                                                allowOutsideClick: 'false',
                                                backdrop: 'true',
                                                allowEnterKey: 'false',
                                                timer: '3000'
                                            });
                                        }
                                    });
                                }
                            },
                            failure(respuesta) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'No se Pudo conectar con el servidor',
                                    text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                    confirmButtonText: 'Entendido'
                                });
                            }
                        });
                    } else if (respuesta === "Error Cuenta") {
                        $("#CI").addClass("error");
                        $("#pass").addClass("error");
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el sistema',
                            text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                            confirmButtonText: 'Entendido'
                        });
                    }
                },
                failure(respuesta) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se Pudo conectar con el servidor',
                        text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                        confirmButtonText: 'Entendido'
                    });
                }
            });
        } else {
            if ($('#CI').val() == "" && $('#pass').val() == "") {
                console.log('ambos');
                $("#CI").addClass("error");
                $("#pass").addClass("error");
            } else if ($('#pass').val() == "") {
                console.log('pass');
                $("#pass").addClass("error");
                $("#CI").removeClass("error");
            } else if ($('#CI').val() == "") {
                console.log('CI')
                $("#CI").addClass("error");
                $("#pass").removeClass("error");
            }
        }

    });
});

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "LEM";
    } else {
        document.title = "Inicio de Sesion";
    }
});

const reloj = () => {
    const text = document.getElementById("reloj");
    text.innerHTML = moment().format('DD/MM/YY hh:mm');
};
