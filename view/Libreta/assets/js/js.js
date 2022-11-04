$(window).on('load', function () {
    document.title = "Libreta";
    Libretas();
    $("#Grupo div.submodule").hide();
    $("#Clase div.submodule").hide();
});
$(document).ready(function () {
    $(".module").tooltip({
        track: true,
    });
    $("#navbar").menu();
})

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "LEM";
    } else {
        document.title = "Libreta";
    }
});

const Libretas = () => {
    $(".distancia").addClass("inactive");
    $("#Libretas").removeClass("inactive");
    $("#Content").empty();
    $("#Libretas a div img").attr('src', $("#Libretas a div img").attr('src').replace('folder.png', 'folder (1).png'));
    $.ajax({
        url: '/Amari/view/Libreta/GetLibreta.php',
        type: 'Get',
        beforeSend: function () {
            console.log('Lista de Libretas')
        },
        success(respuesta) {
            $libreta = JSON.parse(respuesta)
            $Libreta1 = $libreta.Libreta.Resultado;
            let Contador = 0;
            $Libreta1.forEach($sel => {
                var Modulo =
                    '<div class=" libreta col-12 col-md-4" id="' + Contador + '">' +
                    '<div class="marginleft3 titulo fs-3">' +
                    $sel.Curso + ' ' + $sel.Grado + '° ' + $sel.Orientacion +
                    '</div>' +
                    '<div class="marginleft3 fs-5">' +
                    'Docente: ' + $sel.Nombre + ' ' + $sel.Apellido +
                    '</div>' +
                    '<div class="marginleft3 fs-6 ">' +
                    'Curso: ' + $sel.Curso +
                    '</div>' +
                    '<div class="marginleft3 fs-6">' +
                    'Orientacion: ' + $sel.Orientacion +
                    '</div>' +
                    '<div class="marginleft3 fs-6">' +
                    'Asignatura: ' + $sel.Asignatura +
                    '</div>' +
                    '<div class="marginleft3 fs-6">' +
                    'Año: ' + $sel.Año +
                    '</div>' +
                    '<div class="marginleft3 fs-6"> ' +
                    'Turno: ' + $sel.Turno +
                    '</div>' +
                    '<div class="button -blue relative centrarhorizontalmente seleccionar" id="' + Contador + '">' +
                    '<p>' +
                    'Seleccionar' +
                    '</p>' +
                    '</div>'
                $('#Content').append(Modulo)
                Contador = Contador + 1;
            });
            $(".seleccionar").on('click', function () {
                localStorage.setItem("LibretaSel", JSON.stringify($Libreta1[$(this).attr('id')]));
                $(".distancia").toggleClass("inactive");
                $("#Libretas").toggleClass("inactive");
                Estudiante();
            });
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

const Estudiante = () => {
    $(".row#Libretas a div.module img").attr('src', $(".row#Libretas a div.module img").attr('src').replace('folder (1).png', 'folder.png'));
    $(".row#Estudiante a div.module img").attr('src', $(".row#Estudiante a div.module img").attr('src').replace('Customer.png', 'Customer (1).png'));
    $("#Content").empty();
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
            $Estudiante = $LEstudiante.Estudiante.Resultado;
            let Contador = 1;
            $Estudiante.forEach($sel => {
                if ($sel.Domicilio === null) {
                    $sel.Domicilio = 'No establecido';
                }
                var Modulo =
                    '<div class="Alumno1 col ">' +
                    '<div class="row foto">' +
                    '<img class="Alumnos" src="/Amari   /Estudiante/' + $sel.Foto + '">' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="NomAlu col-11">' +
                    '<p> ' + $sel.Nombre + ' ' + $sel.Apellido + '</p>' +
                    '</div>' +
                    '<div class="NumAlu col-1">' +
                    '<p>' + Contador + '</p>' +
                    '</div>' +
                    '<div class="CedulaAlu col-12">' +
                    '<p> ' + $sel.CI + ' </p>' +
                    '</div>' +
                    '<div class="DirecAlu col-12">' +
                    '<p> ' + $sel.Domicilio + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

                $('#Content').append(Modulo)
                Contador = Contador + 1;
            });
            localStorage.setItem("LEstudiante", JSON.stringify($Estudiante));
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

const Navbar = (id) => {
    IDs = [
        {
            vacio: "folder.png",
            lleno: "folder (1).png",
            id: "Libretas"
        },
        {
            vacio: "notas.png",
            lleno: "notas (1).png",
            id: "Libretas"
        },
        {
            vacio: "planificacion.png",
            lleno: "planificacion (1).png",
            id: "Libretas"
        },
        {
            vacio: "Customer.png",
            lleno: "Customer (1).png",
            id: "Estudiante"
        },
        {
            vacio: "Clipboard.png",
            lleno: "Clipboard (1).png",
            id: "Asistencia"
        },
        {
            vacio: "grade.png",
            lleno: "grade (1).png",
            id: "Calificacion"
        },
        {
            vacio: "left-align.png",
            lleno: "left-align.png",
            id: "Desarrollo"
        },
        {
            vacio: "team.png",
            lleno: "team (1).png",
            id: "Coordinacion"
        },
        {
            vacio: "meeting.png",
            lleno: "meeting (1).png",
            id: "Reunion"
        },
        {
            vacio: "people.png",
            lleno: "people (1).png",
            id: "Diagnostico"
        },
        {
            vacio: "observation.png",
            lleno: "observation (1).png",
            id: "Observacion"
        },
        {
            vacio: "planning.png",
            lleno: "planning (1).png",
            id: "Planificacion"
        }
    ];
    if (!($("#" + id).hasClass("inactive"))) {
        $("#Content").removeClass('overhidden');
        IDs.forEach(function (sel) {
            $("#" + sel.id + " a div img").attr('src', $("#" + sel.id + " a div img").attr('src').replace(sel.lleno, sel.vacio));
            if (sel.id === id) {
                $("#" + id + " a div img").attr('src', $("#" + id + " a div img").attr('src').replace(sel.vacio, sel.lleno));
            }
        });
        if (id === "Grupo" || id === "Clase") {
            if ($("#" + id + " div a div.submodule").css("display") === 'none') {
                console.log("abrir");
                if (id === "Grupo") {
                    $("#Grupo div.submodule").show().fadeIn('slow');
                } else if (id === "Clase") {
                    $("#Clase div.submodule").show().fadeIn('slow');
                }
            } else {
                console.log("cerrar");
                if (id === "Grupo") {
                    $("#Grupo div.submodule").fadeOut('slow').hide();
                } else if (id === "Clase") {
                    $("#Clase div.submodule").fadeOut('slow').hide();
                }
            }
        } else {
            $("#Grupo div.submodule").fadeOut('slow').hide();
            $("#Clase div.submodule").fadeOut('slow').hide();
        }
        if (id === "Libretas") {
            Libretas();
        } else if (id === "Estudiante") {
            Estudiante();
        } else if (id === "Calificacion") {
            Calificacion();
        }
    }
}
const Calificacion = () => {
    $("#Content").empty();
    $("#Content").removeClass('scroll-box');
    $Estudiante = JSON.parse(localStorage.getItem("LEstudiante"));
    let Contador = 1;
    let Calificacion =
        '<div class="row">' +
        '<div class="col-8 scroll-box overflowy" id="Calificacion1">' +
        '</div>' +
        '<div class="Alumno col-4" id="Persona1">' +
        '<div class="row foto">' +
        '<img class="Alumnos" src="/Amari/Estudiante/incognito">' +
        '</div>' +
        '<div class="row">' +
        '<div class="NomAlu col-11">' +
        '<p></p>' +
        '</div>' +
        '<div class="NumAlu col-1">' +
        '<p></p>' +
        '</div>' +
        '<div class="CedulaAlu col-12">' +
        '<p></p>' +
        '</div>' +
        '<div class="DirecAlu col-12">' +
        '<p></p>' +
        '</div>' +
        '</div>'
    '</div>'
    $('#Content').append(Calificacion)
    $Estudiante.forEach($sel => {
        var Modulo =
            '<div class="Calificaciones row">' +
            '<div class="numeroAlu col-2 ceropad">' +
            '<p class="NLista">Nº Lista</p>' +
            '<div class="numAlu">' +
            '<p class="numLista"> ' + Contador + ' </p> ' +
            '</div>' +
            '</div>' +
            '<div class="TipoCali col-2 ceropad">' +
            '<p class="TipoC">Tipo</p>' +
            '<div class="SelecTipo col-12 centrar1">' +
            '<form action="#" id="' + Contador + '" class="tamano centar1">' +
            '<select name="tipos" id="' + $sel.CI + '" class="widthcien">' +
            '<option value="Tipo">Tipo</option>' +
            '<option value="LT">T. de Lab.</option>' +
            '<option value="O">Oral</option>' +
            '<option value="TD">TD</option>' +
            '<option value="TE">T. Escrito</option>' +
            '<option value="TI">T. Investigacion</option>' +
            '<option value="TP">T. Practica</option>' +
            '</select>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '<div class="Calif col-2 ceropad">' +
            '<p class="nota"> Nota </p>' +
            '<div class="numnota" id="Nota">' +
            '<input type="number" class="calif" name="note" id="' + $sel.CI + '">' +
            '</div>' +
            '</div>' +
            '<div class="descripcion col-3">' +
            '<div class="button -blue centrar" id="' + $sel.CI + '">' +
            '<p>' +
            'Descripcion' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="descripcion1 col-3">' +
            '<div class="button -blue centrar" id="' + $sel.CI + '">' +
            '<p>' +
            'Guardar' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        $("#Calificacion1").append(Modulo);
        Contador = Contador + 1;
    });
    var Descripcion = [null, null];
    $(".Calificaciones").mouseenter(function () {
        $Estudiante = JSON.parse(localStorage.getItem("LEstudiante"));
        const numero = $(this).text().split(" ");
        $(".Alumnos").empty();
        $(".Alumnos").attr("src", ' /Amari/Estudiante/' + $Estudiante[numero[2] - 1].Foto);
        $(".NomAlu p").empty();
        $(".NomAlu p").append($Estudiante[numero[2] - 1].Nombre + ' ' + $Estudiante[numero[2] - 1].Apellido);
        $(".NumAlu p").empty();
        $(".NumAlu p").append(numero[2] - 1);
        $(".CedulaAlu p").empty();
        $(".CedulaAlu p").append($Estudiante[numero[2] - 1].CI);
        $(".DirecAlu p").empty();
        $(".DirecAlu p").append($Estudiante[numero[2] - 1].Domicilio);
    });
    $(".descripcion .button").on('click', function () {
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
                '<input type="text" id="Descripcion" class="input" required>' +
                '<span class="highlight"></span>' +
                '<span class="bar"></span>' +
                '<label>Descripción</label>' +
                '</div>'
        }).then((result) => {
            if ($('#Descripcion').val() !== "") {
                Descripcion = [$('#Descripcion').val(), $(this).attr("id")];
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'El bloque de texto se a quedado vacio',
                    confirmButtonText: 'Entendido',
                    timer: '2000',
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false'
                });
            }
        });
    });
    $(".descripcion1 .button").on('click', function () {
        $Estudiante = JSON.parse(localStorage.getItem("LEstudiante"));
        $Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        if (parseInt($("input#" + $(this).attr("id") + ".calif").val()) <= 12 && $('select#' + $(this).attr("id")).val() !== "Tipo" && $("input#" + $(this).attr("id") + ".calif").val() !== "") {
            $('select#' + $(this).attr("id")).css('border-color', '#0014A7');
            $("input#" + $(this).attr("id") + ".calif").css('border-color', '#0014A7');
            let tipo = $('select#' + $(this).attr("id")).val();
            let nota = $("input#" + $(this).attr("id") + ".calif").val();
            let CI = $(this).attr("id");
            if (!(Descripcion[1] === $(this).attr("id"))) {
                Descripcion[1] = null;
                Descripcion[0] = null;
            }
            if (Descripcion[0] === null) {
                $.ajax({
                    url: '/Amari/view/Libreta/Calificacion.php',
                    type: 'POST',
                    data: {
                        Estudiante: CI,
                        Libreta: $Libretita,
                        Descripcion: '',
                        Nota: nota,
                        Tipo: tipo,
                        beforeSend: function () {
                            console.log('Calificacion sin descripcion')
                        }
                    },
                    success(respuesta) {
                        console.log("F");
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
            } else {
                $.ajax({
                    url: '/Amari/view/Libreta/Calificacion.php',
                    type: 'POST',
                    data: {
                        Estudiante: CI,
                        Libreta: $Libretita,
                        Descripcion: Descripcion[0],
                        Nota: nota,
                        Tipo: tipo,
                        beforeSend: function () {
                            console.log('Calificacion con descripcion')
                        }
                    },
                    success(respuesta) {
                        console.log("F");
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
        } else {
            if ($('select#' + $(this).attr("id")).val() === "Tipo") {
                $('select#' + $(this).attr("id")).css('border-color', 'red');
            }else{
                $('select#' + $(this).attr("id")).css('border-color', '#0014A7');
            }
            if ($("input#" + $(this).attr("id") + ".calif").val() === "" || $("input#" + $(this).attr("id") + ".calif").val() >= 12) {
                $("input#" + $(this).attr("id") + ".calif").css('border-color', 'red');
            }else{
                $("input#" + $(this).attr("id") + ".calif").css('border-color', '#0014A7');
            }
        }
    });
}
