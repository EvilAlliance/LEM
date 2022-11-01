<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/login.php';
$_SESSION['Seccion'] = 'Libreta';
if (!(isset($_SESSION['CI']))) {
    if (!(isset($_SESSION['Rol']))) {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/CerrarSesion.php';
        $CerrarSesion = new controllerCerrarSesion;
        $CerrarSesion->CerrarSesionsinLog();
        $Controllerlogin = new controllerLogin();
        $Controllerlogin->Iniciar();
    }
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/Amari/view/login/assets/img/login_files/LEM_Gris.svg">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link href="/Amari/view/Libreta/assets/css/librerias/bootstrap.min.css" rel="stylesheet">
    <link href="/Amari/view/Libreta/assets/js/Librerias/jquery-ui-1.13.2.custom/jquery-ui.min.css" rel="stylesheet">
    <link href="/Amari/view/Libreta   /assets/js/Librerias/jquery-ui-1.13.2.custom/jquery-ui.structure.min.css" rel="stylesheet">
    <link href="/Amari/view/Libreta/assets/css/css.css" rel="stylesheet">
    <!--Header-->
    <link href="/Amari/view/Template/Header/css/css.css" rel="stylesheet">
    <!--Footer-->
    <link href="/Amari/view/Template/Footer/css/css.css" rel="stylesheet">
</head>

<body class="d-flex flex-column min-vh-100 overhidden">
    <?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/view/Template/Header/index.php';
    ?>
    <div class="row dentro position-ralative">
        <div class="col-1 dentro navbar overflowy">
            <div class="row inactive module" id="Libretas" onclick="Navbar('Libretas')">
                <a href="#" title="Listado de Libretas">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/folder.png">
                    </div>
                </a>
            </div>
            <div id="Estudiante" class="row inactive module" onclick="Navbar('Estudiante')">
                <a href="#" title="Listado de Estudiante">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/Customer.png">
                    </div>
                </a>
            </div>
            <div id="Asistencia" class="row inactive module" onclick="Navbar('Asistencia')">
                <a href="#" title="Contol de Asistencia">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/Clipboard.png">
                    </div>
                </a>
            </div>
            <div id="Calificacion" class="row inactive module" onclick="Navbar('Calificacion')">
                <a href="#" title="Calificacion">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/grade.png">
                    </div>
                </a>
            </div>
            <div id="Desarrollo" class="row inactive module" onclick="Navbar('Desarrollo')">
                <a href="#" title="Desarrollo del Curso">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/left-align.png">
                    </div>
                </a>
            </div>
            <div id="Coordinacion" class="row inactive module" onclick="Navbar('Coordinacion')">
                <a href="#" title="Coordinación">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/team.png">
                    </div>
                </a>
            </div>
            <div id="Reunion" class="row inactive module" onclick="Navbar('Reunion')">
                <a href="#" title="Reunion">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/meeting.png">
                    </div>
                </a>
            </div>
            <div id="Diagnostico" class="row inactive module" onclick="Navbar('Diagnostico')">
                <a href="#" title="Diagnostico del Grupo">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/people.png">
                    </div>
                </a>
            </div>
            <div id="Observacion" class="row inactive module" onclick="Navbar('Observacion')">
                <a href="#" title="Observaciones">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/observation.png">
                    </div>
                </a>
            </div>
            <div id="Planificacion" class="row inactive module" onclick="Navbar('Planificacion')">
                <a href="#" title="Planificacion">
                    <div class="col-12 centrar1">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/planning.png">
                    </div>
                </a>
            </div>
        </div>
        <div class="col-11 dentro">
            <div class="row  dentro scroll-box overflowy" id="Content">

            </div>
        </div>
    </div>
    <?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/view/Template/Footer/index.php';
    ?>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/package/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/luxon.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/moment.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/Jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/jquery-ui-1.13.2.custom/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/js.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Sesion.js"></script>
    <script type="text/javascript" src="/Amari/view/Template/Footer/js/js.js"></script>
    <script type="text/javascript" src="/Amari/view/Template/Header/js/js.js"></script>

</body>

</html>