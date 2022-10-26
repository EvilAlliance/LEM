$(window).on('load', function () {
    document.title = "Inicio de Sesion";
    $("#menu1").hide();
    $("#SecRol").hide();
    $("#boton1").hide();
    $('#ListadeRol').hide();    
});

$(document).ready(function () {
    $("#seleccionado1").on('click', function () {
        console.log('idioma');
        if ($("#menu1").css('display') != 'none') {
            $("#menu1").toggleClass("slidedown").animate({ top: '40px' }, 'slow');
            setTimeout(() => {
                $("#menu1").hide().toggleClass("slidedown");
            }, 600);
        } else {
            $("#menu1").show().toggleClass("slidedown").animate({ top: '80px' }, 'slow');
            setTimeout(() => {
                $("#menu1").toggleClass("slidedown");
            }, 600);
        }
    });
    $("#menu1").on('click', function () {
        $("#menu1").toggleClass("slideup").animate({ top: '40px' }, 'slow');
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
        Swal.fire({
            title: 'Ingrese la Cedula',
            background: '#f1f1f1',
            backdrop: 'true',
            allowOutsideClick: 'false',
            allowEnterKey: 'false',
            showDenyButton: 'true',
            confirmButtonText: 'Confirmar',
            denyButtonText: 'Cancelar',
            confirmButtonColor: '#13af01',
            denyButtonColor: '#b91d1d',
            html:
                '<div class="Swal group mx-auto">' +
                '<input type="number" id="CIolvido" class="input" required>' +
                '<span class="highlight"></span>' +
                '<span class="bar"></span>' +
                '<label>Cedula</label>' +
                '</div>'
        }).then((result) => {
            if ($('#CIolvido').val() !== "") {
                let CI = $('#CIolvido').val();
                $.ajax({
                    url: 'view/login/ExisteUsuario.php',
                    type: 'POST',
                    data: {
                        CI: CI,
                        beforeSend: function () {
                            console.log("Check Usuario");
                        }
                    },
                    success(respuesta) {
                        $Cuenta = JSON.parse(respuesta);
                        if ($Cuenta.Existe.Resultado === "Existe Usuario") {
                            $.ajax({
                                url: 'view/login/Seguridad.php',
                                type: 'Get',
                                beforeSend: function () {
                                    console.log("Cantidad de Seguridad");
                                },
                                success(respuesta) {
                                    $Cantidad = JSON.parse(respuesta);
                                    if (Number($Cantidad.Cantidad.Resultado.Cantidad) === 2) {
                                        $.ajax({
                                            url: 'view/login/Olvidar.php',
                                            type: 'Get',
                                            beforeSend: function () {
                                                console.log("Pregunta y Respuesta de Seguridad");
                                            },
                                            success(respuesta) {
                                                $Pregunta = JSON.parse(respuesta);
                                                Swal.fire({
                                                    title: 'Ingrese la Repuesta de la Pregunta',
                                                    background: '#f1f1f1',
                                                    backdrop: 'true',
                                                    allowOutsideClick: 'false',
                                                    allowEnterKey: 'false',
                                                    showDenyButton: 'true',
                                                    confirmButtonText: 'Confirmar',
                                                    denyButtonText: 'Cancelar',
                                                    confirmButtonColor: '#13af01',
                                                    denyButtonColor: '#b91d1d',
                                                    html:
                                                        $Pregunta.Seguridad.Resultado[0].Pregunta +
                                                        '<div class="Swal group mx-auto" style="margin-top: px;">' +
                                                        '<input type="text" id="Respuesta" class="input" required>' +
                                                        '<span class="highlight"></span>' +
                                                        '<span class="bar"></span>' +
                                                        '<label>Respuesta</label>' +
                                                        '</div>'

                                                }).then((result) => {
                                                    if ($('#Respuesta').val() !== "") {
                                                        if ($('#Respuesta').val() === $Pregunta.Seguridad.Resultado[0].Respuesta) {
                                                            console.log($Pregunta.Seguridad.Resultado[1].Pregunta);
                                                            Swal.fire({
                                                                title: 'Ingrese la Repuesta de la Pregunta',
                                                                background: '#f1f1f1',
                                                                backdrop: 'true',
                                                                allowOutsideClick: 'false',
                                                                allowEnterKey: 'false',
                                                                showDenyButton: 'true',
                                                                confirmButtonText: 'Confirmar',
                                                                denyButtonText: 'Cancelar',
                                                                confirmButtonColor: '#13af01',
                                                                denyButtonColor: '#b91d1d',
                                                                html:
                                                                    $Pregunta.Seguridad.Resultado[1].Pregunta +
                                                                    '<div class="Swal group mx-auto" style="margin-top: px;">' +
                                                                    '<input type="text" id="Respuesta1" class="input" required>' +
                                                                    '<span class="highlight"></span>' +
                                                                    '<span class="bar"></span>' +
                                                                    '<label>Respuesta</label>' +
                                                                    '</div>'

                                                            }).then((result) => {
                                                                if ($('#Respuesta1').val() !== "") {
                                                                    if ($('#Respuesta1').val() === $Pregunta.Seguridad.Resultado[1].Respuesta) {
                                                                        Inicio();
                                                                    }
                                                                } else {
                                                                    console.log('Vacio');
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        title: 'El Campo se Encuantra Vacio',
                                                                        background: '#f1f1f1',
                                                                        backdrop: 'true',
                                                                        allowOutsideClick: 'false',
                                                                        allowEnterKey: 'false',
                                                                        timer: '3000'
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    } else {
                                                        console.log('Vacio');
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'El Campo se Encuantra Vacio',
                                                            background: '#f1f1f1',
                                                            backdrop: 'true',
                                                            allowOutsideClick: 'false',
                                                            allowEnterKey: 'false',
                                                            timer: '3000'
                                                        });
                                                    }
                                                });
                                            },
                                            failure(respuesta) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'No se Pudo conectar con el servidor',
                                                    text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                                    confirmButtonText: 'Entendido',
                                                    timer: '2000',
                                                    background: '#f1f1f1',
                                                    backdrop: 'true',
                                                    allowOutsideClick: 'false',
                                                    allowEnterKey: 'false',
                                                });
                                            }
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'No tenes las Preguntas de Seguridad Establecidas',
                                            background: '#f1f1f1',
                                            backdrop: 'true',
                                            allowOutsideClick: 'false',
                                            allowEnterKey: 'false',
                                            timer: '3000'
                                        });
                                    }
                                },
                                failure(respuesta) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'No se Pudo conectar con el servidor',
                                        text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                        confirmButtonText: 'Entendido',
                                        timer: '2000',
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false'
                                    });
                                }
                            });

                        } else if ($Cuenta.Existe.Resultado === "Error Usuario") {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se a Encontrado el Usuario Ingresado',
                                confirmButtonText: 'Entendido',
                                timer: '2000',
                                background: '#f1f1f1',
                                backdrop: 'true',
                                allowOutsideClick: 'false',
                                allowEnterKey: 'false'
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error en el sistema',
                                text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                confirmButtonText: 'Entendido',
                                timer: '2000',
                                background: '#f1f1f1',
                                backdrop: 'true',
                                allowOutsideClick: 'false',
                                allowEnterKey: 'false',
                            });
                        }
                    },
                    failure(respuesta) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se Pudo conectar con el servidor',
                            text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                            confirmButtonText: 'Entendido',
                            timer: '2000',
                            background: '#f1f1f1',
                            backdrop: 'true',
                            allowOutsideClick: 'false',
                            allowEnterKey: 'false'
                        });
                    }
                });
            } else {
                console.log('Vacio');
                Swal.fire({
                    icon: 'error',
                    title: 'El Campo se Encuantra Vacio',
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                    timer: '3000'
                });
            }
        });
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
                    $Login = JSON.parse(respuesta);
                    if ($Login.Existe.Resultado === "Existe Cuenta") {
                        Seguridad();
                    } else if ($Login.Existe.Resultado === "Error Cuenta") {
                        $("#CI").addClass("error");
                        $("#pass").addClass("error");
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el sistema',
                            text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                            confirmButtonText: 'Entendido',
                            timer: '2000',
                            background: '#f1f1f1',
                            backdrop: 'true',
                            allowOutsideClick: 'false',
                            allowEnterKey: 'false',
                        });
                    }
                },
                failure(respuesta) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se Pudo conectar con el servidor',
                        text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                        confirmButtonText: 'Entendido',
                        timer: '2000',
                        background: '#f1f1f1',
                        backdrop: 'true',
                        allowOutsideClick: 'false',
                        allowEnterKey: 'false'
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

const Seguridad = () => {
    delete $Cantidad;
    delete Cantidad;
    $.ajax({
        url: 'view/login/Seguridad.php',
        type: 'GET',
        beforeSend: function () {
            console.log("Olvidar");
        },
        success(respuesta) {
            $Cantidad = JSON.parse(respuesta);
            Cantidad = Number($Cantidad.Cantidad.Resultado.Cantidad) + 1;
            if (Cantidad <= 2) {
                Swal.fire({
                    title: 'Ingrese Pregunta y Respuesta de Seguridad Nº ' + Cantidad,
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                    showDenyButton: 'true',
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    confirmButtonColor: '#13af01',
                    denyButtonColor: '#b91d1d',
                    html:
                        '<div class="Swal group mx-auto">' +
                        '<input type="text" id="Pregunta" class="input" required>' +
                        '<span class="highlight"></span>' +
                        '<span class="bar"></span>' +
                        '<label>Pregunta</label>' +
                        '</div>' +
                        '<div class="Swal group mx-auto">' +
                        '<input type="text" id="Respuesta" class="input" required>' +
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
                                Respuesta: Respuesta,
                                beforeSend: function () {
                                    console.log("Insert Seguridad");
                                }
                            },
                            success(respuesta) {
                                if (Cantidad <= 2) {
                                    Seguridad();
                                }
                            },
                            failure(respuesta) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'No se Pudo conectar con el servidor',
                                    text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                                    confirmButtonText: 'Entendido',
                                    timer: '2000',
                                    background: '#f1f1f1',
                                    backdrop: 'true',
                                    allowOutsideClick: 'false',
                                    allowEnterKey: 'false',
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
            } else {
                Inicio();
            }
        },
        failure(respuesta) {
            Swal.fire({
                icon: 'error',
                title: 'No se Pudo conectar con el servidor',
                text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                confirmButtonText: 'Entendido',
                timer: '2000',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
        }
    });
};

const Inicio = () => {
    $("#login").hide();
    $("#SecRol").show();
    $("#boton").hide();
    $("#boton1").show()
    $("#Ingresar").hide();
    $('#ListadeRol').show();
    $.ajax({
        url: 'view/login/GetRol.php',
        type: 'GET',
        beforeSend: function () {
            console.log("Get Rol");
        },
        success(respuesta) {
            $Rol = JSON.parse(respuesta);
            $rol = $Rol.Rol.Resultado;
            $rol.forEach($sel => {
                var group =
                    '<div class="group mx-auto">' +
                    '<div class="rol" id="' + $sel.Rol.replace(" ", "") + '">' +
                    '<div class="group--visibleToggle-eye">' +
                    '<img src="view/login/assets/img/TickVacio.png"/>' +
                    '</div>' +
                    '<p>' +
                    $sel.Rol +
                    '</p>' +
                    '</div>' +
                    '</div>';
                $("#ListadeRol").append(group);
                $sel.Rol = $sel.Rol.replace(" ", "");
            });
            $(".rol").on('click', function () {

                if ($("#" + $(this).attr('id') + " div img").attr("src") === "view/login/assets/img/TickVacio.png") {
                    $rol.forEach($sel => {
                        if ($("#" + $sel.Rol + " div img").attr("src") === "view/login/assets/img/TickRelleno.png") {
                            $("#" + $sel.Rol + " div img").attr("src", "view/login/assets/img/TickVacio.png");
                        }
                    });
                    $("#" + $(this).attr('id') + " div img").attr("src", "view/login/assets/img/TickRelleno.png")
                } else if ($("#" + $(this).attr('id') + " div img").attr("src") === "view/login/assets/img/TickRelleno.png") {
                    $("#" + $(this).attr('id') + " div img").attr("src", "view/login/assets/img/TickVacio.png");
                }
            });
            $("#boton1").on('click', function () {
                $rol.forEach($sel => {
                    if ($("#" + $sel.Rol + " div img").attr("src") === "view/login/assets/img/TickRelleno.png") {
                        $inicio = $sel.Rol;
                    }
                });
                if (typeof $inicio !== 'undefined') {
                    if ($inicio !== null) {
                        console.log($inicio);
                        $.ajax({
                            url: 'view/login/Pestana.php',
                            type: 'GET',
                            data: {
                                pestana: $inicio,
                                beforeSend: function () {
                                    console.log("Pestana " + $inicio);
                                }
                            },
                        });
                    }
                }
            });
        },
        failure(respuesta) {
            Swal.fire({
                icon: 'error',
                title: 'No se Pudo conectar con el servidor',
                text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                confirmButtonText: 'Entendido',
                timer: '2000',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
        }
    });
}
