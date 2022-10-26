<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/CerrarSesion.php';
$_SESSION['Seccion'] = 'Login';
if ( isset($_SESSION['CI'])){
  if (isset($_SESSION['Rol'])){
    $controller = new controllerLogin;
    $controller->Pestana($_SESSION['Rol']);
  } else {
    $CerrarSesion = new controllerCerrarSesion;
    $CerrarSesion->CerrarSesionsinLog();
  }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="view/login/assets/img/login_files/LEM_Gris.svg">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
  <link href="view/login/assets/css/librerias/bootstrap.min.css" rel="stylesheet">
  <link href="view/login/assets/css/css.css" rel="stylesheet">
  <!--Header-->
  <link href="view/Template/Header/css/css.css" rel="stylesheet">
  <!--Footer-->
  <link href="view/Template/Footer/css/css.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>

<body class="d-flex flex-column min-vh-100">
  <?php
  require_once $_SERVER['DOCUMENT_ROOT'] . '/view/Template/Header/index.php';
  ?>
  <div class="row position-relative w-100 dentro ceromar scroll-box">
    <div class="login col centrar ceropad">
      <div class="d-block d-md-none position-relative w-100 chico">
        <div class="wrapper" id="seleccionado1">
          <div class="select-language">
            <div class="select-language-container">
              <img class="uru" src="view/login/assets/img/URU.jpg" id="primario1" />
            </div>
          </div>
        </div>
        <div class="wrapper" id="menu1">
          <div class="select-language">
            <div class="select-language-container">
              <img class="eng" src="view/login/assets/img/ENG.png" id="secundario1" />
            </div>
          </div>
        </div>
        <div class="wrapper" id="ayuda1">
          <div class="select-language">
            <div class="select-language-container">
              <p>
                ?
              </p>
            </div>
          </div>
        </div>
        <img class="logo centrar" src="view/login/assets/img/LEM.svg">
      </div>
      <div class="caja position-relative m-auto centrar1">
        <h3 id="login">
          Inicio de Sesion
        </h3>
        <h3 id="SecRol">
          Seleccione el Rol
        </h3>
        <span class="bar"></span>
      </div>
      <div class="ingresar w-100 position-relative" id="Ingresar">
        <div class="group mx-auto">
          <input type="number" id="CI" class="input" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Cedula</label>
        </div>
        <div class="group mx-auto">
          <input type="checkbox" id="show" name="show" class="group--visibleToggle" checked>
          <div class="group--visibleToggle-eye open">
            <img src="view/login/assets/img/eye-open.png" />
          </div>
          <div class="group--visibleToggle-eye close">
            <img src="view/login/assets/img/eye-close.png" />
          </div>
          <input id="pass" type="password" class="input" required maxlength="23">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Contraseña</label>
        </div>
        <div class="position-relative w-100 olvido">
          <p id="olvidar">
            ¿Has olvidado tu contraseña?
          </p>
        </div>
      </div>
      <div class="ingresar w-100 position-relative margintop scroll-box" id="ListadeRol">
      </div>
      <div class="centrar1 martop">
        <div class="button -blue position-relative" id="boton">
          <p id="Iniciar">
            Iniciar Sesion
          </p>
        </div>
        <div class="button -blue position-relative" id="boton1">
          <p id="Sec">
            Selecionar Rol
          </p>
        </div>
      </div>
    </div>
  </div>
  <?php
  require_once $_SERVER['DOCUMENT_ROOT'] . '/view/Template/Footer/index.php';
  ?>
  <script type="text/javascript" src="view/login/assets/js/Librerias/package/dist/sweetalert2.all.min.js"></script>
  <script type="text/javascript" src="view/login/assets/js/Librerias/luxon.js"></script>
  <script type="text/javascript" src="view/login/assets/js/Librerias/moment.js"></script>
  <script type="text/javascript" src="view/login/assets/js/Librerias/Jquery/jquery.min.js"></script>
  <script type="text/javascript" src="view/login/assets/js/js.js"></script>
  <script type="text/javascript" src="view/Template/Footer/js/js.js"></script>

</body>

</html>