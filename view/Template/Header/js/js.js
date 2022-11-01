$(window).on('load', function () {
    $.ajax({
        url: '/Amari/view/Template/Header/GetRol.php',
        type: 'GET',
        beforeSend: function () {
            console.log("Get Rol");
        },
        success(respuesta) {
            if (!(respuesta === 'No debe')) {
                $Rol = JSON.parse(respuesta);
                var modulo =
                    '<div class="dropdown" id="drop">'+
                '<input id="toggle2" type="checkbox">'+
                ' <label for="toggle2" class="animate ">Roles<i class="fa fa-list float-right"></i></label>'+
                '  <ul class="animate" id="menuRol">'+
                ' </ul>'+
                '</div>'    
                $("#rol").append(modulo);
                $rol = $Rol.Rol.Resultado;
                $rol.forEach($sel => {
                    var group =
                        ' <li class="animate" id="' + $sel.Rol.replace(" ", "") + '">' + $sel.Rol + '<i class="fa fa-code float-right"></i></li>';
                    $("#menuRol").append(group);
                    $sel.Rol = $sel.Rol.replace(" ", "");
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

$(document).ready(function () {
    $('#CerrarSesion').on('click', function () {
        $.ajax({
            url: '/Amari/view/Template/Header/CerrarSesion.php',
            type: 'GET',
            beforeSend: function () {
                console.log("Get Rol");
            },
            success(respuesta) {
                window.location.href = '/Amari/Index.php';
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
});
