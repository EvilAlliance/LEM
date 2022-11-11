<?php
session_start();
$_SESSION['Seccion'] = 'Libreta';
if (!(isset($_SESSION['CI']) && isset($_SESSION['Rol']) && isset($_SESSION['pass']))) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/CerrarSesion.php';
    $CerrarSesion = new controllerCerrarSesion;
    $CerrarSesion->CerrarSesionsinLog();
    header('location: /Amari/view/login/assets/index.php');
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
    <link href="/Amari/view/Libreta/assets/js/Librerias/jquery-ui-1.13.2.custom/jquery-ui.structure.min.css" rel="stylesheet">
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
        <div class="col-2 col-md-1 dentro navbar scroll-box centrar1">
            <div class="row widthcien distancia tooltip1" id="Libretas" onclick="Navbar('Libretas')">
                <a class="centrar1" href="#" title="Listado de Libretas">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/folder.png">
                    </div>
                </a>
            </div>
            <div id="Estudiante" class="row widthcien distancia tooltip1" onclick="Navbar('Estudiante')">
                <a class="centrar1" href="#" title="Listado de Estudiante">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/customer.png">
                    </div>
                </a>
            </div>
            <div id="Asistencia" class="row widthcien distancia tooltip1" onclick="Navbar('Asistencia')">
                <a class="centrar1" href="#" title="Contol de Asistencia">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/clipboard.png">
                    </div>
                </a>
            </div>
            <div id="Calificacion" class="row widthcien distancia tooltip1" onclick="Navbar('Calificacion')">
                <a class="centrar1" href="#" title="Calificacion">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/grade.png">
                    </div>
                </a>
            </div>
            <div id="Clase" class="row widthcien distancia tooltip1" onclick="Navbar('Clase')">
                <a class="centrar1" href="#" title="Clase">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/notas.png">
                    </div>
                </a>
                <div id="Desarrollo" class="widthcien distancia tooltip1" onclick="Navbar('Desarrollo')">
                    <a class="centrar1" href="#" title="Desarrollo del Curso">
                        <div class="col-12 centrar1 submodule">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/left-align.png">
                        </div>
                    </a>
                </div>
                <div id="Coordinacion" class="widthcien distancia tooltip1" onclick="Navbar('Coordinacion')">
                    <a class="centrar1" href="#" title="Coordinación">
                        <div class="col-12 centrar1 submodule">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/team.png">
                        </div>
                    </a>
                </div>
            </div>
            <div id="Grupo" class="row  widthcien distancia tooltip1 centar1" onclick="Navbar('Grupo')">
                <a class="centrar1" href="#" title="Grupo">
                    <div class="col-12 centrar1 module">
                        <img class="img-fluid" src="/Amari/view/Libreta/assets/img/people.png">
                    </div>
                </a>
                <div id="Diagnostico" class="widthcien distancia tooltip1" onclick="Navbar('Diagnostico')">
                    <a class="centrar1" href="#" title="Diagnostico del Grupo">
                        <div class="col-12 centrar1 submodule">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/planificacion.png">
                        </div>
                    </a>
                </div>
                <div id="Reunion" class="widthcien distancia tooltip1" onclick="Navbar('Reunion')">
                    <a class="centrar1" href="#" title="Reunion">
                        <div class="col-12 centrar1 submodule">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/meeting.png">
                        </div>
                    </a>
                </div>
                <div id="Observacion" class="widthcien distancia tooltip1" onclick="Navbar('Observacion')">
                    <a class="centrar1" href="#" title="Observaciones">
                        <div class="col-12 submodule centrar1">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/observation.png">
                        </div>
                    </a>
                </div>
                <div id="Planificacion" class=" widthcien  centrar1 tooltip1" onclick="Navbar('Planificacion')">
                    <a class="centrar1" href="#" title="Planificacion">
                        <div class="col-12 submodule centrar1">
                            <img class="img-fluid" src="/Amari/view/Libreta/assets/img/planning.png">
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-9 col-md-11 dentro">
            <div class="row dentro scroll-box" id="Content">
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
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Librerias/jquery-ui-1.13.2.custom/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/js.js"></script>
    <script type="text/javascript" src="/Amari/view/Libreta/assets/js/Control.js"></script>
    <script type="text/javascript" src="/Amari/view/Template/Footer/js/js.js"></script>
    <script type="text/javascript" src="/Amari/view/Template/Header/js/js.js"></script>
</body>

</html>