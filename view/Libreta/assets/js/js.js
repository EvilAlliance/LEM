$(window).on('load', function () {
    document.title = "Libreta";
    Libretas();
    /*if (localStorage.getItem('Login') !== 'true') {
                            localStorage.setItem('Login', true);
                        localStorage.setItem('Libreta', false);
                        $.ajax({
                            url: '/view/login/Sesion.php',
                        type: 'GET',
                        success(respuesta) {
                            window.location.href = respuesta;
            }
        });
    }*/
});
$(document).ready(function () {
    $(".module").tooltip({
        track: true,
    });
    $(".module").tooltip();
})

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "LEM";
    } else {
        document.title = "Libreta";
    }
});

const Libretas = () => {
    $("#Content").empty();
    $("#Libretas a div img").attr('src', $("#Libretas a div img").attr('src').replace('folder.png', 'folder (1).png'));
    $.ajax({
        url: '/view/Libreta/GetLibreta.php',
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
                    '<div class=" libreta col-4" id="' + Contador + '">' +
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
                $(".module").toggleClass("inactive");
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
    $(".module#Libretas a div img").attr('src', $(".module#Libretas a div img").attr('src').replace('folder (1).png', 'folder.png'));
    $(".module#Estudiante a div img").attr('src', $(".module#Estudiante a div img").attr('src').replace('Customer.png', 'Customer (1).png'));
    $("#Content").empty();
    $Libretita = JSON.parse(localStorage.getItem("LibretaSel"));
    $.ajax({
        url: '/view/Libreta/GetAlumno.php',
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
            console.log($Estudiante);
            $Estudiante.forEach($sel => {
                if ($sel.Domicilio === null) {
                    $sel.Domicilio= 'No establecido';
                }
                var Modulo =
                '<div class="Alumno col ">'+
                '<div class="row foto">'+
                '<img class="Alumnos" src="/Estudiante/'+$sel.Foto+'">'+
                '</div>'+
                '<div class="row">'+
                '<div class="NomAlu col-11">'+
                '<p> '+$sel.Nombre +' '+ $sel.Apellido+'</p>'+
                '</div>'+
                '<div class="NumAlu col-1">'+
                '<p>'+ Contador +'</p>'+
                '</div>'+
                '<div class="CedulaAlu col-12">'+
                '<p> '+$sel.CI +' </p>'+
                '</div>'+
                '<div class="DirecAlu col-12">'+
                '<p> '+ $sel.Domicilio+'</p>'+
                '</div>'+
                '</div>'+   
                '</div>'

                $('#Content').append(Modulo)
                Contador = Contador + 1;
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

const Navbar = (id) => {
    IDs = [
        {
            vacio: "folder.png",
            lleno: "folder (1).png",
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
        IDs.forEach(function (sel) {
            $("#" + sel.id + " a div img").attr('src', $(".module#" + sel.id + " a div img").attr('src').replace(sel.lleno, sel.vacio));
            if (sel.id === id) {
                $("#" + id + " a div img").attr('src', $(".module#" + id + " a div img").attr('src').replace(sel.vacio, sel.lleno));
            }
        });
        if (id === "Libretas") {
            Libretas();
        } else if (id === "Estudiante") {
            Estudiante();
        }
    }

}