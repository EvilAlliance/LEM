$(window).on('load', function () {
    document.title = "Libreta";
    Libretas();
    $("#Grupo div.submodule").hide();
    $("#Clase div.submodule").hide();
});

$(document).tooltip({
    track: true
});

$(document).ready(function () {

})

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "LEM";
    } else {
        document.title = "Libreta";
    }
});

const Libretas = () => {
    $(".tooltip1").addClass("inactive");
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
                $(".tooltip1").toggleClass("inactive");
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
    $(".row#Estudiante a div.module img").attr('src', $(".row#Estudiante a div.module img").attr('src').replace('customer.png', 'customer (1).png'));
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
            if ($LEstudiante.Estudiante.Resultado === "Vacio") {
                Swal.fire({
                    icon: 'info',
                    title: 'Libreta Eligida',
                    text: 'No tiene Estudiantes',
                    confirmButtonText: 'Entendido',
                    timer: '2000',
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                });
            } else {
                $Estudiante = $LEstudiante.Estudiante.Resultado;
                let Contador = 1;
                $Estudiante.forEach($sel => {
                    if ($sel.Domicilio === null) {
                        $sel.Domicilio = 'No establecido';
                    }
                    var Modulo =
                        '<div class="Alumno1 col">' +
                        '<div class="row foto">' +
                        '<img class="Alumnos" src="/Amari/Estudiante/' + $sel.Foto + '">' +
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
            vacio: "customer.png",
            lleno: "customer (1).png",
            id: "Estudiante"
        },
        {
            vacio: "clipboard.png",
            lleno: "clipboard (1).png",
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
    if ($("#" + id).hasClass("inactive") === false) {
        $("#Content").removeClass('overhidden');
        IDs.forEach(function (sel) {
            if ($("#" + sel.id + " a div img").attr('src') === '/Amari/view/Libreta/assets/img/'+sel.lleno) {
                $("#" + sel.id + " a div img").attr('src', $("#" + sel.id + " a div img").attr('src').replace(sel.lleno,sel.vacio));
            }
            if (sel.id === id) {
                $("#" + id + " a div img").attr('src',$("#" + id + " a div img").attr('src').replace(sel.vacio, sel.lleno));
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
        } else if (id === "Asistencia") {
            Control();
        }
    }
}
const Calificacion = () => {
    $("#Content").empty();
    $("#Content").removeClass('scroll-box');
    $("#Content").removeClass('overflowy');
    $Estudiante = JSON.parse(localStorage.getItem("LEstudiante"));
    let Contador = 1;
    let Calificacion =
        '<div class="row toolbar centrar1">' +
        '<div class="centrar1vertical">' +
        '<button type="button" class="btn btn-light IE">Instancia de Escrito</button>' +
        '<button type="button" class="btn btn-light IE1 centrar1">' +
        '<img src="/Amari/view/Libreta/assets/img/info.png">' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="row dentro1">' +
        '<div class="col-8 scroll-box dentro1" id="Calificacion1">' +
        '</div>' +
        '<div class="col-4 scroll-box centrar1 dentro1">' +
        '<div class="Alumno col" id="Persona1">' +
        '<div class="row centrar1">' +
        '<img class="Alumnos" src="/Amari/Estudiante/incognito">' +
        '</div>' +
        '<div class="row info">' +
        '<div class="NomAlu col-11">' +
        '<p></p>' +
        '</div>' +
        '<div class="NumAlu col-1">' +
        '<p></p>' +
        '</div>' +
        '</div>' +
        '<div class="CedulaAlu col-12">' +
        '<p></p>' +
        '</div>' +
        '<div class="DirecAlu col-12">' +
        '<p></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    $('#Content').append(Calificacion)
    $Estudiante.forEach($sel => {
        var Modulo =
            '<div class="Calificaciones row" id="' + $sel.CI + '">' +
            '<div class="numeroAlu col-2 ceropad">' +
            '<p class="NLista">Nº Lista</p>' +
            '<div class="numAlu">' +
            '<p class="numLista"> ' + Contador + ' </p> ' +
            '</div>' +
            '</div>' +
            '<div class="TipoCali col-2 ceropad">' +
            '<p class="TipoC">Tipo</p>' +
            '<div class="SelecTipo col-12 centrar1 cienheig1">' +
            '<div class="dropdown tamano"  id="' + $sel.CI + '">' +
            '<button class="btn btn-light dropdown-toggle widthcien" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="' + $sel.CI + '">Tipo</button>' +
            '<ul class="dropdown-menu">' +
            '<li><a class="dropdown-item text-center" id="LT">T. de Lab.</a></li>' +
            '<li><a class="dropdown-item text-center" id="O">Oral</a></li>' +
            '<li><a class="dropdown-item text-center" id="TD">TD</a></li>' +
            '<li><a class="dropdown-item text-center" id="TE">T. Escrito</a></li>' +
            '<li><a class="dropdown-item text-center" id="TI">T. Investigacion</a></li>' +
            '<li><a class="dropdown-item text-center" id="TP">T. Practica</a></li>' +
            '</ul>' +
            '</div>' +
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
    $('.dropdown-submenu a').mouseenter(function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $(".dropdown-menu li a").on('click', function () {
        if ($(this).attr("id") !== "") {
            var selText = $(this).text();
            $(this).parents('div.dropdown').children().first().html(selText + ' <span class="caret" id="' + $(this).attr('id') + '"></span>');
        }
    });

    $(".IE").on('click', function () {
        Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        $.ajax({
            url: '/Amari/view/Libreta/CuantosEscritos.php',
            type: 'POST',
            data: {
                Libreta: Libretita,
                beforeSend: function () {
                    console.log('Cantidad de Instancia de Escrito')
                }
            },
            success(respuesta) {
                $Cantidad = JSON.parse(respuesta);
                Swal.fire({
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                    showDenyButton: 'true',
                    confirmButtonText: 'Guardar',
                    denyButtonText: 'Cancelar',
                    confirmButtonColor: '#13af01',
                    denyButtonColor: '#b91d1d',
                    width: 730,
                    title: 'Ingrese los datos de la instancia',
                    html:
                        '<div class="Calificaciones1 row">' +
                        '<div class="numeroAlu1 col-1 ceropad">' +
                        '<p class="NLista">Nº</p>' +
                        '<div class="numAlu">' +
                        '<p class="numLista"> ' + (parseInt($Cantidad.Cantidad.Resultado.Cantidad) + 1) + ' </p>' +
                        ' </div>' +
                        '</div>' +
                        '<div class="inputFecha col-4 ceropad">' +
                        ' <p class="TipoC">Fecha Realizado</p>' +
                        '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                        '<input type="text" id="FechaRealizado" class="calif">' +
                        '</div>' +
                        ' </div>' +
                        '<div class="inputFecha col-4 ceropad">' +
                        '<p class="nota"> Fecha Entegado </p>' +
                        '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                        '<input type="text" id="FechaEntregado" class="calif">' +
                        '</div>' +
                        '</div>' +
                        '<div class="inputFecha1 col-3 ceropad">' +
                        '<p class="nota"> Funcionario </p>' +
                        '<div class="numnota1">' +
                        '<input type="text" class="calif" name="note" id="Funcionario">' +
                        '</div>' +
                        '</div>',
                    preConfirm: (verificacion) => {
                        if ($("#FechaRealizado").datepicker("getDate") === null) {
                            Swal.showValidationMessage(
                                `Porfavor introduzca una fecha en "Fecha Realizado"`
                            )
                        }
                    }
                }).then((respuesta) => {
                    if (respuesta.isConfirmed) {
                        $datos = $("#FechaRealizado").val().split('/');
                        $FechaRealizado = $datos[2] + "-" + $datos[1] + "-" + $datos[0];
                        if ($("#FechaEntregado").datepicker("getDate") !== null) {
                            $datos = $("#FechaRealizado").val().split('/');
                            $FechaEntregado = $datos[2] + "-" + $datos[1] + "-" + $datos[0];
                        } else {
                            $FechaEntregado = "1111-01-01";
                        }
                        $Funcionario = $("#Funcionario").val();
                        $.ajax({
                            url: '/Amari/view/Libreta/InsertInstanciaEscrito.php',
                            type: 'POST',
                            data: {
                                Libreta: Libretita,
                                FechaRealizado: $FechaRealizado,
                                FechaEntregado: $FechaEntregado,
                                Funcionario: $Funcionario,
                                beforeSend: function () {
                                    console.log('Cantidad de Instancia de Escrito')
                                }
                            },
                            success(respuesta) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'La Instancia se a Almacenado de forma exitosa',
                                    text: '',
                                    confirmButtonText: 'Entendido',
                                    timer: '2000',
                                    background: '#f1f1f1',
                                    backdrop: 'true',
                                    allowOutsideClick: 'false',
                                    allowEnterKey: 'false',
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
                });
                $("#FechaRealizado, #FechaEntregado").datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    dateFormat: 'dd/mm/yy',
                    showAnim: "slideDown",
                    minDate: '1/3/' + parseInt(Libretita.Año),
                    maxDate: '1/3/' + (parseInt(Libretita.Año) + 1)
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
    });

    $(".IE1").on('click', function () {
        Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        $.ajax({
            url: '/Amari/view/Libreta/GetInstanciaEscrito.php',
            type: 'POST',
            data: {
                Libreta: Libretita,
                beforeSend: function () {
                    console.log('Get de Instancia de Escrito')
                }
            },
            success(respuesta) {
                Instancias = JSON.parse(respuesta);
                if (Instancias.Instancia.Resultado === "Vacio") {
                    Swal.fire({
                        icon: 'info',
                        title: 'Libreta Elegida',
                        text: 'No tiene Instancias de Escrito Creadas',
                        confirmButtonText: 'Entendido',
                        timer: '2000',
                        background: '#f1f1f1',
                        backdrop: 'true',
                        allowOutsideClick: 'false',
                        allowEnterKey: 'false',
                    });
                } else {
                    var InstanciasEscrito = '';
                    let constador1 = 0;
                    Instancias.Instancia.Resultado.forEach($sel => {
                        $datos = $sel.Fecha_Entrega.split('-');
                        $sel.Fecha_Entrega = $datos[2] + "/" + $datos[1] + "/" + $datos[0];
                        $datos = $sel.Fecha_Realizado.split('-');
                        $sel.Fecha_Realizado = $datos[2] + "/" + $datos[1] + "/" + $datos[0];
                        if ($sel.Fecha_Entrega === '01/01/1111') {
                            $sel.Fecha_Entrega = "";
                        }
                        InstanciasEscrito = InstanciasEscrito +
                            '<div class="Calificaciones1 row" id="' + constador1 + '">' +
                            '<div class="numeroAlu1 col-1 ceropad">' +
                            '<p class="NLista">Nº</p>' +
                            '<div class="numAlu">' +
                            '<p class="numLista"> ' + (constador1 + 1) + ' </p>' +
                            ' </div>' +
                            '</div>' +
                            '<div class="inputFecha col-4 ceropad">' +
                            ' <p class="TipoC">Fecha Realizado</p>' +
                            '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                            '<input type="text" name="' + constador1 + '" class="calif FechaRealizado" disabled value="' + $sel.Fecha_Realizado + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="inputFecha col-4 ceropad">' +
                            '<p class="nota"> Fecha Entegado </p>' +
                            '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                            '<input type="text" class="calif FechaEntregado" name="' + constador1 + '" disabled value="' + $sel.Fecha_Entrega + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="inputFecha1 col-3 ceropad">' +
                            '<p class="nota"> Funcionario </p>' +
                            '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                            '<input type="text" class="calif Funcionario" name="' + constador1 + '" disabled value="' + $sel.Funcionario + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        constador1 = constador1 + 1;
                    });
                    const mod = [];
                    Swal.fire({
                        title: 'Doble click para modificar',
                        background: '#f1f1f1',
                        backdrop: 'true',
                        allowOutsideClick: 'false',
                        allowEnterKey: 'false',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#416dea',
                        denyButtonColor: '#b91d1d',
                        width: 730,
                        customClass: 'swal-height',
                        html: '<div class="scroll-box" style="height:100%;">' + InstanciasEscrito + '</div>',
                    }).then((respuesta) => {
                        console.log(mod);
                        for (i = 0; i < mod.length; i++) {
                            let FechaEntregado = $('div#' + $(mod[i]).attr('id') + '.Calificaciones1.row input.FechaEntregado').val();
                            $datos = FechaEntregado.split('/');
                            FechaEntregado = $datos[2] + "-" + $datos[1] + "-" + $datos[0];
                            let FechaRealizado = $('div#' + $(mod[i]).attr('id') + '.Calificaciones1.row input.FechaRealizado').val();
                            $datos = FechaRealizado.split('/');
                            FechaRealizado = $datos[2] + "-" + $datos[1] + "-" + $datos[0];
                            let Funcionario = $('div#' + $(mod[i]).attr('id') + '.Calificaciones1.row input.Funcionario').val();
                            $.ajax({
                                url: '/Amari/view/Libreta/UpdateInstanciaEscrito.php',
                                type: 'POST',
                                data: {
                                    ID: Instancias.Instancia.Resultado[(parseInt($(mod[i]).attr('id')))].ID,
                                    FechaRealizado: FechaRealizado,
                                    FechaEntregado: FechaEntregado,
                                    Funcionario: Funcionario,
                                    beforeSend: function () {
                                        console.log('Update de Instancia de Escrito')
                                    }
                                },
                                success(respuesta) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'La Calificacion se a Almacenado de forma exitosa',
                                        text: '',
                                        confirmButtonText: 'Entendido',
                                        timer: '2000',
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false',
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
                    });
                    $("div.SelecTipo input.FechaEntregado, div.SelecTipo input.FechaRealizado").datepicker({
                        showOtherMonths: true,
                        selectOtherMonths: true,
                        dateFormat: 'dd/mm/yy',
                        showAnim: "slideDown",
                        minDate: '1/3/' + parseInt(Libretita.Año),
                        maxDate: '1/3/' + (parseInt(Libretita.Año) + 1)
                    });
                    $("div.SelecTipo").on('click', function () {
                        if ($(this).children().prop("disabled") === true) {
                            $(this).children().prop("disabled", false);
                            let ver = false;
                            for (i = 0; i < mod.length; i++) {
                                if ($(this).parents(".Calificaciones1").attr('id') === $(mod[i]).attr('id')) {
                                    ver = true;
                                    i = 999999;
                                }
                            }
                            if (ver === false) {
                                mod.push($(this).parents(".Calificaciones1"));
                            }
                        }
                    });
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
    });
    $("div.Calificaciones.row div.numeroAlu").on('click', function () {
        Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        let CI = $(this).parents(".Calificaciones").attr("id");
        listaCalificacion(CI, [1, 12], Libretita, "Vacio");
    });
    $("a#TE").on('click', function () {
        $CI = $(this).parents('div.dropdown').children().first().attr('id');
        Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        $.ajax({
            url: '/Amari/view/Libreta/CuantosEscritos.php',
            type: 'POST',
            data: {
                Libreta: Libretita,
                beforeSend: function () {
                    console.log('Cantidad de Instancia de Escrito')
                }
            },
            success(respuesta) {
                $Cantidad = JSON.parse(respuesta);
                if (parseInt($Cantidad.Cantidad.Resultado.Cantidad) === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No tiene Instancia de Escritos Creada',
                        text: 'Por favor cree una instancia si desea darle nota de escrito a sus Alumnos',
                        confirmButtonText: 'Entendido',
                        timer: '2000',
                        background: '#f1f1f1',
                        backdrop: 'true',
                        allowOutsideClick: 'false',
                        allowEnterKey: 'false',
                    });
                    $("a#TE").remove();
                    $("button#" + $CI + ".btn.btn-light.dropdown-toggle.widthcien").html('Tipo');
                } else {
                    $.ajax({
                        url: '/Amari/view/Libreta/CantidadAlumno.php',
                        type: 'POST',
                        data: {
                            Libreta: Libretita,
                            CI: $CI,
                            beforeSend: function () {
                                console.log('Cantidad de Instancia de Escrito de Estudiante')
                            }
                        },
                        success(respuesta) {
                            $CantidadCI = JSON.parse(respuesta);
                            if (parseInt($Cantidad.Cantidad.Resultado.Cantidad) <= parseInt($CantidadCI.Cantidad.Resultado.Cantidad)) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Por favor Modifique los que ya fueron creados',
                                    text: 'El Estudiante ya Tiene Alamacenado la Cantidad de Escritos Disponible',
                                    confirmButtonText: 'Entendido',
                                    timer: '2000',
                                    background: '#f1f1f1',
                                    backdrop: 'true',
                                    allowOutsideClick: 'false',
                                    allowEnterKey: 'false',
                                });
                                $("#" + $CI + ".dropdown .dropdown-menu li a#TE.dropdown-item.text-center").remove();
                                $("button#" + $CI + ".btn.btn-light.dropdown-toggle.widthcien").html('Tipo');
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
    });
    var Descripcion = ['', ''];

    $(".Calificaciones").mouseenter(function () {
        $Estudiante = JSON.parse(localStorage.getItem("LEstudiante"));
        const numero = $(this).text().split(" ");
        $(".Alumnos").empty();
        $(".Alumnos").attr("src", '/Amari/Estudiante/' + $Estudiante[numero[2] - 1].Foto);
        $(".NomAlu p").empty();
        $(".NomAlu p").append($Estudiante[numero[2] - 1].Nombre + ' ' + $Estudiante[numero[2] - 1].Apellido);
        $(".NumAlu p").empty();
        $(".NumAlu p").append(numero[2]);
        $(".CedulaAlu p").empty();
        $(".CedulaAlu p").append($Estudiante[numero[2] - 1].CI);
        $(".DirecAlu p").empty();
        $(".DirecAlu p").append($Estudiante[numero[2] - 1].Domicilio);
    });
    $(".descripcion .button").on('click', function () {
        Swal.fire({
            title: 'Ingrese la Descripción',
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
        Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
        if (parseInt($("input#" + $(this).attr("id") + ".calif").val()) >= 1 && parseInt($("input#" + $(this).attr("id") + ".calif").val()) <= 12 && $('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle').text() !== "Tipo" && $("input#" + $(this).attr("id") + ".calif").val() !== "") {
            $('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle').css('border-color', '#d1e8ff00');
            $("input#" + $(this).attr("id") + ".calif").css('border-color', '#0014A7');
            let tipo = $('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle span').attr("id");
            let nota = $("input#" + $(this).attr("id") + ".calif").val();
            let CI = $(this).attr("id");
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
                        console.log('Calificacion')
                    }
                },
                success(respuesta) {
                    $("button#" + CI + ".btn.btn-light.dropdown-toggle.widthcien").html('Tipo');
                    Swal.fire({
                        icon: 'success',
                        title: 'La Calificacion se a Almacenado de forma exitosa',
                        text: '',
                        confirmButtonText: 'Entendido',
                        timer: '2000',
                        background: '#f1f1f1',
                        backdrop: 'true',
                        allowOutsideClick: 'false',
                        allowEnterKey: 'false',
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
        } else {
            if ($('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle').text() === "Tipo") {
                $('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle').css('border-color', 'red');
            } else {
                $('#' + $(this).attr("id") + '.btn.btn-light.dropdown-toggle').css('border-color', '#d1e8ff00');
            }
            if ($("input#" + $(this).attr("id") + ".calif").val() === "" || $("input#" + $(this).attr("id") + ".calif").val() > 12 || parseInt($("input#" + $(this).attr("id") + ".calif").val()) < 1) {
                $("input#" + $(this).attr("id") + ".calif").css('border-color', 'red');
            } else {
                $("input#" + $(this).attr("id") + ".calif").css('border-color', '#0014A7');
            }
        }
    });
}

const listaCalificacion = (CI, meses, Libretita, Periodo) => {
    $(".dropdown-menu li a").unbind();
    $(".Promedio").unbind();
    $(".ModEl").unbind();
    $("div.SelecTipo, div.Calificaciones.row").unbind();
    $(".Guardar").unbind();
    $.ajax({
        url: '/Amari/view/Libreta/GetCalificacion.php',
        type: 'POST',
        data: {
            CI: CI,
            Libreta: Libretita,
            beforeSend: function () {
                console.log('Get de Calificacion')
            }
        },
        success(respuesta) {
            let Calificacion = JSON.parse(respuesta);
            if (Calificacion.Calificacion.Resultado === "Vacio") {
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
                if ($(".toolbar div.centrar1vertical").find('.dropdown').hasClass("Periodo") === false) {
                    $(".toolbar div.centrar1vertical").append(
                        '<div class="dropdown Periodo" CI="' + CI + '">' +
                        '<button class="btn btn-light dropdown-toggle widthcien" type="button" data-bs-toggle="dropdown" aria-expanded="false">Periodo <span class="caret" id="1 12"></span></button>' +
                        '<ul class="dropdown-menu">' +
                        '<li><a class="dropdown-item text-center" value="Primera Reunion" id="03 04">Primera Reunion</a></li>' +
                        '<li><a class="dropdown-item text-center" value="Mayo" id="05">Mayo</a></li>' +
                        '<li><a class="dropdown-item text-center" value="Segunda Reunion" id="06 07">Segunda Reunion</a></li>' +
                        '<li><a class="dropdown-item text-center" value="Agosto y Setiempre" id="08 09">Agosto y Setiempre</a></li>' +
                        '<li><a class="dropdown-item text-center" value="Tercera Reunion" id="10 12">Tercera Reunion</a></li>' +
                        '</ul>' +
                        '</div>' +
                        '<button type="button" class="btn btn-light ModEl">Eliminar</button>' +
                        '<button type="button" class="btn btn-light Guardar">Guardar</button>' +
                        '<button type="button" class="btn btn-light Promedio">Promedio</button>'
                    );
                }
                $("#Calificacion1").empty();
                let Contador = 0;
                Calificacion.Calificacion.Resultado.forEach($sel => {
                    if ($sel.Tipo !== "P") {
                        $datos = $sel.Fecha.split('-');
                        if ($datos[1] >= meses[0] && $datos[1] <= meses[1] || $datos[1] === meses[0]) {
                            $sel.Fecha = $datos[2] + "/" + $datos[1] + "/" + $datos[0];
                            var Modulo =
                                '<div class="Calificaciones row" id="' + (Contador) + '">' +
                                '<div class="numeroAlu col-2 ceropad">' +
                                '<p class="NLista">Nº</p>' +
                                '<div class="numAlu">' +
                                '<p class="numLista"> ' + (Contador + 1) + ' </p> ' +
                                '</div>' +
                                '</div>' +
                                '<div class="TipoCali col-2 ceropad">' +
                                '<p class="TipoC">Tipo</p>' +
                                '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                                '<div class="dropdown tamano"  id="' + (Contador + 1) + '">' +
                                '<button class="btn btn-light dropdown-toggle widthcien" type="button" disabled data-bs-toggle="dropdown" aria-expanded="false" id="' + (Contador + 1) + '">Tipo</button>' +
                                '<ul class="dropdown-menu">' +
                                '<li><a class="dropdown-item text-center" id="LT">T. de Lab.</a></li>' +
                                '<li><a class="dropdown-item text-center" id="O">Oral</a></li>' +
                                '<li><a class="dropdown-item text-center" id="TD">TD</a></li>' +
                                '<li><a class="dropdown-item text-center" id="TI">T. Investigacion</a></li>' +
                                '<li><a class="dropdown-item text-center" id="TP">T. Practica</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="Calif col-2 ceropad">' +
                                '<p class="nota"> Nota </p>' +
                                '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                                '<input type="number" class="calif" name="note" id="' + (Contador + 1) + '" disabled value="' + parseInt($sel.Nota) + '">' +
                                '</div>' +
                                '</div>' +
                                '<div class="Calif col-3 ceropad">' +
                                '<p class="nota"> Fecha </p>' +
                                '<div class="numnota" id="Nota">' +
                                '<input type="text" class="calif0" name="note" id="' + (Contador + 1) + '" disabled value="' + $sel.Fecha + '">' +
                                '</div>' +
                                '</div>' +
                                '<div class="descripcion1 col-3 ceropad">' +
                                '<p class="nota"> Descripcion </p>' +
                                '<div class="SelecTipo col-12 centrar1 cienheig1">' +
                                '<input type="text" class="calif1" name="note" id="' + (Contador + 1) + '" disabled value="' + $sel.Descripcion + '">' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            $("#Calificacion1").append(Modulo);
                            if ($sel.Tipo === "LT") {
                                text = "T. de Lab.";
                            } else if ($sel.Tipo === "O") {
                                text = "Oral";
                            } else if ($sel.Tipo === "TD") {
                                text = "TD";
                            } else if ($sel.Tipo === "TD") {
                                text = "T. Escrito";
                            } else if ($sel.Tipo === "TE") {
                                text = "T. Escrito";
                            } else if ($sel.Tipo === "TI") {
                                text = "T. Investigacion";
                            } else if ($sel.Tipo === "TP") {
                                text = "T. Practica";
                            }
                            $("#" + (Contador + 1) + ".btn.btn-light.dropdown-toggle").html(text + ' <span class="caret" id="' + $sel.Tipo + '"></span>');
                            Contador = Contador + 1;
                        }
                    }
                });
                Swal.fire({
                    icon: 'info',
                    title: 'Doble click en el campo que desee modificar',
                    text: '',
                    confirmButtonText: 'Entendido',
                    timer: '2000',
                    background: '#f1f1f1',
                    backdrop: 'true',
                    allowOutsideClick: 'false',
                    allowEnterKey: 'false',
                });
                var mod = [];
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
                $(".Promedio").on('click', function () {
                    if (Periodo !== "Vacio") {
                        $.ajax({
                            url: '/Amari/view/Libreta/GetPromedio.php',
                            type: 'POST',
                            data: {
                                CI: CI,
                                Periodo: Periodo,
                                Libreta: Libretita,
                                beforeSend: function () {
                                    console.log('Get de Promedio')
                                }
                            },
                            success(respuesta) {
                                let Promedio = JSON.parse(respuesta);
                                if (Promedio.Promedio.Resultado === "Vacio") {
                                    Swal.fire({
                                        icon: '',
                                        title: 'Ingrese Promedio',
                                        text: 'Periodo' + Periodo,
                                        showCancelButton: true,
                                        cancelButtonText: 'Cncelar',
                                        confirmButtonText: 'Entendido',
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false',
                                        html:
                                            '<div class="Swal group mx-auto">' +
                                            '<input type="number" id="Promedio" class="input" required>' +
                                            '<span class="highlight"></span>' +
                                            '<span class="bar"></span>' +
                                            '<label>Promedio</label>' +
                                            '</div>',
                                        preConfirm: (verificacion) => {
                                            if (!(parseInt($("#Promedio").val()) >= 1 && parseInt($("#Promedio").val()) <= 12 && $("#Promedio").val() !== "")) {
                                                Swal.showValidationMessage(
                                                    `Porfavor introduzca un promedio o un numero entre el 1 y el 12`
                                                )
                                            }
                                        }
                                    }).then((respuesta) => {
                                        if (respuesta.isConfirmed) {
                                            let Promedio = $("#Promedio").val();
                                            $.ajax({
                                                url: '/Amari/view/Libreta/Promedio.php',
                                                type: 'POST',
                                                data: {
                                                    CI: CI,
                                                    Periodo: Periodo,
                                                    Libreta: Libretita,
                                                    nota: Promedio,
                                                    beforeSend: function () {
                                                        console.log('Insert de Promedio')
                                                    }
                                                },
                                                success(respuesta) {
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'El promedio se a Almacenado de forma exitosa',
                                                        text: '',
                                                        confirmButtonText: 'Entendido',
                                                        timer: '2000',
                                                        background: '#f1f1f1',
                                                        backdrop: 'true',
                                                        allowOutsideClick: 'false',
                                                        allowEnterKey: 'false',
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
                                    });
                                } else {
                                    Swal.fire({
                                        icon: '',
                                        title: 'Promedio',
                                        text: 'Periodo' + Periodo,
                                        confirmButtonText: 'Cerrar',
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false',
                                        html:
                                            '<div class="Swal group mx-auto">' +
                                            '<input type="number" id="Promedio" class="input" value="' + Promedio.Promedio.Resultado[0].Nota + '" required>' +
                                            '<span class="highlight"></span>' +
                                            '<span class="bar"></span>' +
                                            '<label>Promedio</label>' +
                                            '</div>',
                                        didOpen: () => {
                                            $("input#Promedio").prop("disabled", true);
                                        }
                                    });
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
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Periodo no seleccionado',
                            text: '',
                            confirmButtonText: 'Entendido',
                            timer: '2000',
                            background: '#f1f1f1',
                            backdrop: 'true',
                            allowOutsideClick: 'false',
                            allowEnterKey: 'false',
                        });
                    }
                });
                $(".ModEl").on('click', function () {
                    if ($(".ModEl").html() === "Eliminar") {
                        $(".ModEl").html("Modificar");
                        $(".Guardar").html("Borrar");
                        Swal.fire({
                            icon: 'info',
                            title: 'Click en el cuadro que desea borrar',
                            text: '',
                            confirmButtonText: 'Entendido',
                            timer: '2000',
                            background: '#f1f1f1',
                            backdrop: 'true',
                            allowOutsideClick: 'false',
                            allowEnterKey: 'false',
                        });
                    } else if ($(".ModEl").html() === "Modificar") {
                        $(".ModEl").html("Eliminar");
                        $(".Guardar").html("Guardar");
                        Swal.fire({
                            icon: 'info',
                            title: 'Doble click en el campo que desee modificar',
                            text: '',
                            confirmButtonText: 'Entendido',
                            timer: '2000',
                            background: '#f1f1f1',
                            backdrop: 'true',
                            allowOutsideClick: 'false',
                            allowEnterKey: 'false',
                        });
                    }
                    var mod = [];
                });
                $("div.SelecTipo, div.Calificaciones.row").on('click', function () {
                    if ($(".ModEl").html() === "Eliminar") {
                        if ($(this).children().prop("disabled") === true) {
                            $(this).children().prop("disabled", false);
                            let ver = false;
                            for (i = 0; i < mod.length; i++) {
                                if ($(this).parents(".Calificaciones").attr('id') === $(mod[i]).attr('id')) {
                                    ver = true;
                                    i = 999999;
                                }
                            }
                            if (ver === false) {
                                mod.push($(this).parents(".Calificaciones"));
                            }
                        } else if ($(this).children().children("button").prop("disabled") === true) {
                            $(this).children().children("button").prop("disabled", false);
                            if ($(this).children().children("button").children("span").attr('id') !== "TE") {
                                $(this).children().children("button").prop("disabled", false);
                                let ver = false;
                                for (i = 0; i < mod.length; i++) {
                                    if ($(this).parents(".Calificaciones").attr('id') === $(mod[i]).attr('id')) {
                                        ver = true;
                                        i = 999999;
                                    }
                                }
                                if (ver === false) {
                                    mod.push($(this).parents(".Calificaciones"));
                                }
                            }
                        }
                    } else if ($(".ModEl").html() === "Modificar") {
                        let ver = false;
                        for (i = 0; i < mod.length; i++) {
                            if ($(this).attr('id') === $(mod[i]).attr('id')) {
                                ver = true;
                                i = 999999;
                            }
                        }
                        if (ver === false) {
                            mod.push($(this));
                        }
                    }
                });
                $(".Guardar").on("click", function () {
                    if ($(this).text() === 'Guardar') {
                        for (i = 0; i < mod.length; i++) {
                            if (parseInt($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val()) >= 1 && parseInt($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val()) <= 12 && $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val() !== "") {
                                $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').css('border-color', '#0014A7');
                                let Tipo = $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row button span').attr('id');
                                let Nota = parseInt($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val());
                                let Descripcion = $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif1').val();
                                $.ajax({
                                    url: '/Amari/view/Libreta/UpdateCalificacion.php',
                                    type: 'POST',
                                    data: {
                                        ID: Calificacion.Calificacion.Resultado[(parseInt($(mod[i]).attr('id')))].ID,
                                        Tipo: Tipo,
                                        Nota: Nota,
                                        Descripcion: Descripcion,
                                        beforeSend: function () {
                                            console.log('Update de Instancia de Escrito')
                                        }
                                    },
                                    success(respuesta) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'La Calificacion se a Modificado de forma exitosa',
                                            text: '',
                                            confirmButtonText: 'Entendido',
                                            timer: '2000',
                                            background: '#f1f1f1',
                                            backdrop: 'true',
                                            allowOutsideClick: 'false',
                                            allowEnterKey: 'false',
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
                            } else {
                                if ($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val() === "" || parseInt($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val()) > 12 || parseInt($('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').val()) < 1) {
                                    $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').css('border-color', 'red');
                                } else {
                                    $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row input.calif').css('border-color', '#0014A7');
                                }
                            }
                        }
                    } else if ($(this).text() === "Borrar") {
                        for (i = 0; i < mod.length; i++) {
                            $('div#' + $(mod[i]).attr('id') + '.Calificaciones.row').remove();
                            $.ajax({
                                url: '/Amari/view/Libreta/DeleteCalificacion.php',
                                type: 'POST',
                                data: {
                                    ID: Calificacion.Calificacion.Resultado[(parseInt($(mod[i]).attr('id')))].ID,
                                    beforeSend: function () {
                                        console.log('Delete de Calificacion')
                                    }
                                },
                                success(respuesta) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'La Calificacion se a eliminado de forma exitosa',
                                        text: '',
                                        confirmButtonText: 'Entendido',
                                        timer: '2000',
                                        background: '#f1f1f1',
                                        backdrop: 'true',
                                        allowOutsideClick: 'false',
                                        allowEnterKey: 'false',
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
                    }
                });
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            Swal.fire({
                icon: 'error',
                title: 'No se Pudo conectar con el servidor',
                text: 'Lo sentimos mucho, nos encontramos trabajando en ello',
                confirmButtonText: 'Entendido',
                background: '#f1f1f1',
                backdrop: 'true',
                allowOutsideClick: 'false',
                allowEnterKey: 'false',
            });
        }

    });
}