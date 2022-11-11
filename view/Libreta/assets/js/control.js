$(window).on('load', function () {

});
$(document).ready(function () {

})

const Control = () => {
    $("#Content").empty();
    $Estudiante = llamadaEstudiantes();
    ApendEstudiante($LEstudiante);
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
                localStorage.setItem("LEstudiante", JSON.stringify($Estudiante));
            }
            return $LEstudiante;
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

const ApendEstudiante = ($LEstudiante) => {
    let Contador = 1;
    $LEstudiante.Estudiante.Resultado.forEach($sel => {
        if ($sel.Domicilio === null) {
            $sel.Domicilio = 'No establecido';
        }
        var Modulo =
            '<div class="Alumno1 col">' +
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
            '<div class="row">' +
            '< div class="row" >' +
            '<div class="button -blue relative"  id="boton"></div>' +
            'div class="button -red relative" id="boton2"></div>' +
            '<div class="button -nar relative"  id="boton3"></div>' +
            '<div class="button -yell relative" id="boton4"></div>  ' +
            '</div >    '
        $('#Content').append(Modulo)
        Contador = Contador + 1;
    });
}
