$(window).on('load', function () {

});
$(document).ready(function () {

})

$(document).tooltip({
    track: true
});

const Control = () => {
    $("#Content").empty();
    llamadaEstudiantes();
    RemoveScroll();
    Toolbar();
    ApendEstudiante();
    EventoControl();
}

const llamadaEstudiantes = () => {
    $Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    $.ajax({
        url: '/Amari/view/Libreta/GetAlumno.php',
        type: 'POST',
        data: {
            Libreta: $Libretita,
            beforeSend: function () {
                console.log('Lista de Estudiante')
            }
        },
        success(respuesta) {
            $LEstudiante = JSON.parse(respuesta)
            if ($LEstudiante.Estudiante.Resultado === "Vacio") {
                Swal.fire({
                    icon: 'info',
                    title: 'Estudiante Eligido',
                    text: 'No tiene Calificaciones',
                    confirmButtonText: 'Entendido',
                    timer: '2000',
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                });
            } else {
                localStorage.setItem("LEstudiante", JSON.stringify($LEstudiante.Estudiante.Resultado));
            }
        },
        error(jqXHR, textStatus, errorThrown) {
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

const ApendEstudiante = () => {
    $LEstudiante = JSON.parse(localStorage.getItem("LEstudiante"));
    $("#Content").append('<div class="row dentro1 scroll-box" id="Control"></div>');
    let Contador = 1;
    $LEstudiante.forEach($sel => {
        if ($sel.Domicilio === null) {
            $sel.Domicilio = 'No establecido';
        }
        var Modulo =
            '<div class="Alumno1 col" id="' + $sel.CI + '">' +
            '<div class="row foto relative">' +
            '<img class="Alumnos" src="/Amari/Estudiante/' + $sel.Foto + '"">' +
            '</div>' +
            '<div class="row">' +
            '<div class="NomAlu col-11">' +
            '<p> ' + $sel.Nombre + ' ' + $sel.Apellido + '</p>' +
            '</div>' +
            '<div class="NumAlu col-1">' +
            '<p>' + Contador + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row" value="' + $sel.CI + '">' +
            '<a class="boton" title="Asistencia">' +
            '<div class="boton green relative" value="1" id="boton"></div>' +
            '</a>' +
            '<a class="boton" title="Inasistencia">' +
            '<div class="boton red relative" value="2" id="boton2"></div>' +
            '</a>' +
            '<a class="boton" title="Insasistencia Justificada">' +
            '<div class="boton nar relative" value="3" id="boton3"></div>' +
            '</a>' +
            '<a class="boton" title="Llegada Tarde">' +
            '<div class="boton yell relative" value="4" id="boton4"></div>' +
            '</a>' +
            '</div >' +
            '</div >'
        $('#Control').append(Modulo)
        Contador = Contador + 1;
    });
}

const EventoControl = () => {
    $("div.boton").on('click', function () {
        if ($(".IE").text().replace("Modulo", "") !== "") {
            $("div#" + $(this).parents('.Alumno1').attr('id') + " .boton").each(function () {
                if ($(this).hasClass('active') === true) {
                    $(this).toggleClass("active");
                }
            });
            $(this).toggleClass("active");
            Clases = $(this).attr("class");
            $("#" + $(this).parents('.Alumno1').attr('id') + ".Alumno1").find("div.Modulo").each(function () {
                $(this).parents("a").attr("title", "Modulo " + $(this).attr("id"));
                if ($(this).hasClass("yell") === true) {
                    $(this).removeClass("yell");
                } else if ($(this).hasClass("green") === true) {
                    $(this).removeClass("green");
                } else if ($(this).hasClass("red") === true) {
                    $(this).removeClass("red");
                } else if ($(this).hasClass("nar") === true) {
                    $(this).removeClass("nar");
                }
                $(this).addClass(Clases).removeClass("boton relative active");

                if ($(this).hasClass("yell") === true) {
                    $(this).parents("a").attr("title", $(this).parents("a").attr("title") + " LLegada Tarde");
                } else if ($(this).hasClass("green") === true) {
                    $(this).parents("a").attr("title", $(this).parents("a").attr("title") + " Asistencia");
                } else if ($(this).hasClass("red") === true) {
                    $(this).parents("a").attr("title", $(this).parents("a").attr("title") + " Inasistencia");
                } else if ($(this).hasClass("nar") === true) {
                    $(this).parents("a").attr("title", $(this).parents("a").attr("title") + " Inasistencia Justificada");

                }
            });
        } else {
            swal.fire({
                icon: 'warning',
                title: 'No hay modulo asignado',
                text: 'Porfavor asigne un modulo',
                confirmButtonText: 'Entendido',
                background: '#f1f1f1',
                timer: 2000,
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
        }
    });
}

const Toolbar = () => {
    let Calificacion =
        '<div class="row toolbar centrar1">' +
        '<div class="centrar1vertical">' +
        '<input type="text" class="Clase" id="Fecha">' +
        '<button type="button" class="btn btn-light IE">Modulo</button>' +
        '<div class="dropdown">' +
        '<button class="btn btn-light dropdown-toggle widthcien Estado" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Estado">Estado</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a class="dropdown-item text-center" id="Dictada">Dictada</a></li>' +
        '<li><a class="dropdown-item text-center" id="Inasistencia">Inasistencia</a></li>' +
        '<li><a class="dropdown-item text-center" id="Suspendida">Suspendida</a></li>' +
        '<li><a class="dropdown-item text-center" id="Extra">Extra</a></li>' +
        '<li><a class="dropdown-item text-center" id="Feriado">Feriado</a></li>' +
        '<li><a class="dropdown-item text-center" id="Asueto">Asueto</a></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="btn btn-light Guardar">Guardar</button>' +
        '</div>' +
        '</div>';
    $('#Content').append(Calificacion);
    datepicker('Fecha');
    Desplieque();
}

const RemoveScroll = () => {
    $("#Content").removeClass('scroll-box');
    $("#Content").removeClass('overflowy');
}

const EventoModulo = () => {
    $(".IE").on('click', function () {
        Verificar = CheckFecha();
        if (Verificar === true) {
            Swal.fire({
                icon: '',
                title: 'Ingrese la cantiad de modulo',
                showCancelButton: true,
                cancelButtonText: 'Cncelar',
                confirmButtonText: 'Entendido',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
                html:
                    '<div class="Swal group mx-auto">' +
                    '<input type="number" id="Modulo" class="input" required>' +
                    '<span class="highlight"></span>' +
                    '<span class="bar"></span>' +
                    '<label>Modulo</label>' +
                    '</div>',
                preConfirm: (verificacion) => {
                    if ($("#Modulo").val() === "" || parseInt($("#Modulo").val()) < 0) {
                        Swal.showValidationMessage(
                            `Porfavor introduzca un valor`
                        )
                    }
                }
            }).then((respuesta) => {
                if (respuesta.isConfirmed) {
                    if ($("#Fecha").val() !== "") {
                        let Modulo = $("#Modulo").val();
                        $(".IE").html("Modulos")
                        $(".IE").html($(".IE").html() + ": " + Modulo);
                        $("div.boton").each(function () {
                            if ($(this).hasClass('active') === true) {
                                $(this).toggleClass("active");
                            }
                        });
                        CuadradoModulo(Modulo);
                    } else {

                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'La fecha se encuentra vacio',
                text: 'Porfavor llene el formulario',
                showCancelButton: true,
                confirmButtonText: 'Entendido',
                background: '#f1f1f1',
                timer: 2000,
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
        }
    });
}

const CuadradoModulo = (Modulo) => {
    LEstudiante = JSON.parse(localStorage.getItem("LEstudiante"));
    let contador = 0;
    if ($("div#" + LEstudiante[0].CI + ".Alumno1").find("div.Modulo") !== null) {
        $("div#" + LEstudiante[0].CI + ".Alumno1").find("div.Modulo").each(function () {
            contador = contador + 1;
        });
    }
    if (contador > Modulo) {
        $(".Alumno1").find("div.Modulo").each(function () {
            $(this).remove();
        });
        for (let i = 0; i < Modulo; i++) {
            Cuadrado =
                '<a title="Modulo' + (contador + 1) + '">' +
                '<div class="Modulo" id="' + i + '" style="left:' + (2 + (22 * i)) + 'px;"></div>' +
                '</a>';
            $(".Alumno1").each(function () {
                $(this).find("div.foto").append(Cuadrado);
            });
        }
    } else {
        for (contador; contador < Modulo; contador++) {
            Cuadrado =
                '<a title="Modulo ' + (contador + 1) + '">' +
                '<div class="Modulo" id="' + contador + '" style="left:' + (2 + (22 * contador)) + 'px;"></div>' +
                '</a>';
            $(".Alumno1").each(function () {
                $(this).find("div.foto").append(Cuadrado);
            });
        }
    }
    SelectorModulo();
}

const datepicker = (ID) => {
    Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    $("#" + ID).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'dd/mm/yy',
        showAnim: "slideDown",
        minDate: '1/3/' + parseInt(Libretita.Año),
        maxDate: '1/3/' + (parseInt(Libretita.Año) + 1),
        onSelect: function (date) {
            $(".Guardar").unbind();
            ExisteClase(date);
        }
    });
}

const CheckFecha = () => {
    if ($("#Fecha").val() !== "") {
        return true;
    } else {
        return false;
    }
}

const SelectorModulo = () => {
    $(".Alumno1").find("div.Modulo").on('click', function () {
        $(".boton").unbind();
        ID = $(this).parents('.Alumno1').attr('id');
        ID1 = $(this).attr('id');
        $("div#" + $(this).parents(".Alumno1").attr('id') + " div.boton").on('click', function () {
            $("#" + ID + ".Alumno1").find("div.foto a").attr("title", "Modulo " + $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").attr("id"));
            if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("yell") === true) {
                $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").removeClass("yell");
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("green") === true) {
                $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").removeClass("green");
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("red") === true) {
                $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").removeClass("red")
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("nar") === true) {
                $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").removeClass("nar");
            }
            $("#" + ID + ".Alumno1").find("div.boton").each(function () {
                if ($(this).hasClass('active') === true) {
                    $(this).toggleClass("active");
                }
            });
            Clases = $(this).attr('Class');
            $("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").addClass(Clases).removeClass("boton relative active");
            if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("yell") === true) {
                $("#" + ID + ".Alumno1").find("a").attr("title", $("#" + ID + ".Alumno1").find("a").attr("title") + " LLegada Tarde");
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("green") === true) {
                $("#" + ID + ".Alumno1").find("div.foto a").attr("title", $("#" + ID + ".Alumno1").find("div.foto a").attr("title") + " Asistencia");
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("red") === true) {
                $("#" + ID + ".Alumno1").find("div.foto a").attr("title", $("#" + ID + ".Alumno1").find("div.foto a").attr("title") + " Inasistencia");
            } else if ($("#" + ID + ".Alumno1").find("div#" + ID1 + ".Modulo").hasClass("nar") === true) {
                $("#" + ID + ".Alumno1").find("div.foto a").attr("title", $("#" + ID + ".Alumno1").find("div.foto a").attr("title") + " Inasistencia Justificada");

            }
            CuadradoModulo();
        });
    });
}

const ExisteClase = (date) => {
    $(".IE").html("Modulo");
    $("#Estado").html("Estado");
    $(".Alumno1").find("div.Modulo").each(function () {
        $(this).remove();
    });
    $(".Alumno1 div.row div.boton").each(function () {
        if ($(this).hasClass('active') === true) {
            $(this).toggleClass("active");
        }
    });
    Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    datos = date.split('/');
    Fecha = datos[2] + "-" + datos[1] + "-" + datos[0];
    $.ajax({
        url: '/Amari/view/Libreta/GetClase.php',
        type: 'POST',
        data: {
            Libreta: $Libretita,
            Fecha: Fecha,
            beforeSend: function () {
                console.log('Lista de Estudiante')
            }
        },
        success(respuesta) {
            if ($(this).hasClass('active') === true) {
                $(this).toggleClass("active");
            }
            $("#Estado").html("Estado");
            Clase = JSON.parse(respuesta);
            localStorage.setItem("Clase", JSON.stringify(Clase));
            $(".Alumno1").find("div.Modulo").each(function () {
                $(this).remove();
                $(this).parent().remove();
            });
            if (Clase.Clase.Resultado !== "Vacio") {
                Clase.Clase.Resultado.forEach($sel => {
                    let tiende = "";
                    $sel.Asiste = parseInt($sel.Asiste);
                    if ($sel.Asiste === 2) {
                        Atiende = "yell";
                    } else if ($sel.Asiste === 1) {
                        Atiende = "green";
                    } else if ($sel.Asiste === 4) {
                        Atiende = "red";
                    } else if ($sel.Asiste === 3) {
                        Atiende = "nar";
                    } else {
                        Atiende = "";
                    }
                    Cuadrado =
                        '<a title="Modulo' + $sel.Modulo + '">' +
                        '<div class="Modulo ' + Atiende + '" id="' + $sel.Modulo + '" style="left:' + (2 + (22 * ($sel.Modulo - 1))) + 'px;"></div>' +
                        '</a>';
                    $("div#" + $sel.CI + ".Alumno1").children("div.row.foto").append(Cuadrado);

                    let Module = 0;
                    if (Module < $sel.Modulo) {
                        Module = $sel.Modulo;
                    }
                    var Estado = "";
                    if ($sel.Estado === null) {
                        Estado = $sel.Estado1;
                    } else if ($sel.Estado1 === null) {
                        Estado = $sel.Estado;
                    }
                    $('div.dropdown').find("button").html(Estado + ' <span class="caret" id="' + Estado + '"></span>');
                    $(".IE").html("Modulos: " + Module);
                });
                $("div.Alumno1").find("div.row.foto a").each(function () {
                    $(this).attr("title", "Modulo " + $(this).find("div.Modulo").attr('id'));
                    if ($(this).find("div.Modulo").hasClass("yell") === true) {
                        $(this).attr("title", $(this).attr("title") + " LLegada Tarde");
                    } else if ($(this).find("div.Modulo").hasClass("green") === true) {
                        $(this).attr("title", $(this).attr("title") + " Asistencia");
                    } else if ($(this).find("div.Modulo").hasClass("red") === true) {
                        $(this).attr("title", $(this).attr("title") + " Inasistencia");
                    } else if ($(this).find("div.Modulo").hasClass("nar") === true) {
                        $(this).attr("title", $(this).attr("title") + " Inasistencia Justificada");

                    }
                });
                $(".Guardar").on('click', function () {
                    GetClases();
                    $(".IE").html("Modulo");
                    $("#Estado").html("Estado");
                    $(".Alumno1").find("div.Modulo").each(function () {
                        $(this).remove();
                    });
                    $(".Alumno1 div.row div.boton").each(function () {
                        if ($(this).hasClass('active') === true) {
                            $(this).toggleClass("active");
                        }
                    });
                    $("#Fecha").datepicker("setDate", "");
                });
            } else {
                $(".Guardar").on('click', function () {
                    InsertClases();
                    $(".IE").html("Modulo");
                    $("#Estado").html("Estado");
                    $(".Alumno1").find("div.Modulo").each(function () {
                        $(this).remove();
                    });
                    $(".Alumno1 div.row div.boton").each(function () {
                        if ($(this).hasClass('active') === true) {
                            $(this).toggleClass("active");
                        }
                    });
                    $("#Fecha").datepicker("setDate", "");
                });
                EventoModulo();
            }
        },
        error(jqXHR, textStatus, errorThrown) {
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

const InsertClases = () => {
    if ($("#Fecha").val() !== "" && $(".IE").html().replace("Modulos:  ", "") !== "Modulo" && $("#Estado").text() !== "Estado") {
        let Alumno = [];
        $(".Alumno1").each(function () {
            let falta = [];
            falta.push($(this).attr('id'))
            $(this).find("div.Modulo").each(function () {
                if ($(this).hasClass("yell") === true) {
                    falta.push(2);
                } else if ($(this).hasClass("green") === true) {
                    falta.push(1);
                } else if ($(this).hasClass("red") === true) {
                    falta.push(4);
                } else if ($(this).hasClass("nar") === true) {
                    falta.push(3);
                } else {
                    falta.push(0);
                }
            });
            Alumno.push(falta);
        });
        datos = $("#Fecha").val().split('/');
        Fecha = datos[2] + "-" + datos[1] + "-" + datos[0];
        AltaClase($("#Estado span").attr('id'), Alumno, $(".IE").html().replace("Modulos: ", ""), Fecha);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Vacios',
            text: 'Todos los campos de la barra horizontal tiene que tener datos asignados',
            confirmButtonText: 'Entendido',
            timer: '2000',
            background: '#f1f1f1',
            backdrop: 'true',
            allowOutsideClick: 'false',
            allowEnterKey: 'false',
        });
    }
}

const GetClases = () => {
    Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    if ($("#Fecha").val() !== "" && $(".IE").html().replace("Modulos:  ", "") !== "Modulo" && $("#Estado").text() !== "Estado") {
        let Alumno = [];
        $(".Alumno1").each(function () {
            let falta = [];
            falta.push($(this).attr('id'))
            $(this).find(".Modulo").each(function () {
                if ($(this).hasClass("yell") === true) {
                    falta.push(2);
                } else if ($(this).hasClass("green") === true) {
                    falta.push(1);
                } else if ($(this).hasClass("red") === true) {
                    falta.push(4);
                } else if ($(this).hasClass("nar") === true) {
                    falta.push(3);
                } else {
                    falta.push(0);
                }
            });
            Alumno.push(falta);
        });
        datos = $("#Fecha").val().split('/');
        Fecha = datos[2] + "-" + datos[1] + "-" + datos[0];
        UpdateClase($("#Estado span").attr('id'), Alumno, $(".IE").html().replace("Modulos: ", ""), Fecha, Clase);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Vacios',
            text: 'Todos los campos de la barra horizontal tiene que tener datos asignados',
            confirmButtonText: 'Entendido',
            timer: '2000',
            background: '#f1f1f1',
            backdrop: 'true',
            allowOutsideClick: 'false',
            allowEnterKey: 'false',
        });
    }
}

const Desplieque = () => {
    $(".dropdown-menu li a").on('click', function () {
        if ($(this).attr("id") !== "") {
            var selText = $(this).text();
            $(this).parents('div.dropdown').children().first().html(selText + ' <span class="caret" value="' + $(this).attr('value') + '" id="' + $(this).attr('id') + '"></span>');
            if ($(this).parents('div.dropdown').hasClass("Periodo") === true) {
                Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
                let meses = $(".toolbar div.centrar1vertical div.dropdown button.dropdown-toggle span").attr('id').split(' ');
                listaCalificacion($(".toolbar div.centrar1vertical div.dropdown").attr('CI'), meses, Libretita, $(".toolbar div.centrar1vertical div.dropdown button.dropdown-toggle span").attr('value'));
            }
        }
    });
}

const AltaClase = (Estado, Alumno, Modulo, Fecha) => {
    $Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    $.ajax({
        url: '/Amari/view/Libreta/SetClase.php',
        type: 'POST',
        data: {
            Libreta: $Libretita,
            Estado: Estado,
            Inasistencias: Alumno,
            Modulo: Modulo,
            Fecha: Fecha,
            beforeSend: function () {
                console.log('Lista de Estudiante')
            }
        },
        success(respuesta) {
            $LEstudiante = JSON.parse(respuesta)
            Swal.fire({
                icon: 'success',
                title: 'El Control de Asistencia se a Almacenado Exitosamente',
                text: '',
                confirmButtonText: 'Entendido',
                timer: '2000',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
            $(".Guardar").unbind();
        },
        error(jqXHR, textStatus, errorThrown) {
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

const UpdateClase = (Estado, Alumno, Modulo, Fecha, Clase) => {
    $Clase = JSON.parse(localStorage.getItem("Clase"));
    $Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    let ID = [];
    $Clase.Clase.Resultado.forEach($sel => {
        let verificador = 0;
        ID.forEach($ID => {
            if ($sel.ID === $ID && verificador === 0 || $sel.ID === $ID && verificador === 1) {
                verificador = 1;
            } else {
                verificador = 2;
            }
        });
        if (verificador === 2 || verificador === 0) {
            ID.push($sel.ID);
        }
    });
    $.ajax({
        url: '/Amari/view/Libreta/UpdateClase.php',
        type: 'POST',
        data: {
            ID: ID,
            Libreta: $Libretita,
            Estado: Estado,
            Inasistencias: Alumno,
            Modulo: Modulo,
            Fecha: Fecha,
            beforeSend: function () {
                console.log('Lista de Estudiante')
            }
        },
        success(respuesta) {
            Swal.fire({
                icon: 'success',
                title: 'El Control de Asistencia se a Modficado Exitosamente',
                text: '',
                confirmButtonText: 'Entendido',
                timer: '2000',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
            $(".IE").html("Modulo");
            $("#Estado").html("Estado");
            $(".Alumno1").find("div.Modulo").each(function () {
                $(this).remove();
            });
            $("div#" + $(this).parent().parent().attr('id') + " .boton").each(function () {
                if ($(this).hasClass('active') === true) {
                    $(this).toggleClass("active");
                }
            });
            $("#Fecha").datepicker("setDate", "");
            $(".Guardar").unbind();
        },
        error(jqXHR, textStatus, errorThrown) {
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
