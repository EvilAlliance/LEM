<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="view\login\assets\img/LEM.svg">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
  <link href="view/login/assets/css/librerias/bootstrap.min.css" rel="stylesheet">
  <link href="view\login\assets\css\css.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>

<body class="d-flex flex-column min-vh-100">
  <div class="d-none d-md-block w-100 row ceropad ceromar barra">
    <div class="col" id="barra">
      <img class="logo" src="view\login\assets\img\LEM.svg">
    </div>
    <div class="col">
      <div id="rol">
      </div>
    </div>
    <div class="col">
      <div id="perfil">
      </div>
    </div>
  </div>
  <div class="row relative w-100 dentro ceromar">
    <div class="login col centrar ceropad">
      <div class="caja relative m-auto centrar1">
        <h3 id="login" class="d-block m-auto">
          Inicio de Sesion
          </3h>
          <span class="bar"></span>
      </div>
      <div class="ingresar w-100 relative">
        <div class="group mx-auto">
          <input type="text" required>
          <span class="bar"></span>
          <label>Cedula</label>
        </div>
        <div class="group mx-auto">
          <input type="text " required>
          <span class="bar"></span>
          <label>Contraseña</label>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none d-md-block w-100 footer row ceropad mt-auto ceromar">
    <div class="col-4 cuarenta">
      <div class="wrapper" id="seleccionado">
        <div class="select-language">
          <div class="select-language-container">
            <img class="uru" src="view\login\assets\img\URU.jpg" id="primario" />
          </div>
        </div>
      </div>
      <div class="wrapper" id="menu">
        <div class="select-language">
          <div class="select-language-container">
            <img class="eng" src="view\login\assets\img\ENG.png" id="secundario" />
          </div>
        </div>
      </div>
      <div class="col" id="reloj">
      </div>
    </div>
  </div>

  <script type="text/javascript" src="view/login/assets/js/librerias/package/dist/sweetalert2.all.min.js"></script>
  <script type="text/javascript" src="view\login\assets\js\librerias\luxon.js"></script>
  <script type="text/javascript" src="view\login\assets\js\librerias\moment.js"></script>
  <script type="text/javascript" src="view/login/assets/js/librerias/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="view/login/assets/js/js.js"></script>
</body>

</html>