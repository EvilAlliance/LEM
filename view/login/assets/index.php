<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="view\login\assets\img\login_files\LEM_Gris.svg">
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
  <div class="row relative w-100 dentro ceromar scroll-box">
    <div class="login col centrar ceropad">
      <div class="d-block d-md-none relative w-100 chico">
        <div class="wrapper" id="seleccionado1">
          <div class="select-language">
            <div class="select-language-container">
              <img class="uru" src="view\login\assets\img\URU.jpg" id="primario1" />
            </div>
          </div>
        </div>
        <div class="wrapper" id="menu1">
          <div class="select-language">
            <div class="select-language-container">
              <img class="eng" src="view\login\assets\img\ENG.png" id="secundario1" />
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
        <img class="logo centrar" src="view\login\assets\img\LEM.svg">
      </div>
      <div class="caja relative m-auto centrar1">
        <h3 id="login">
          Inicio de Sesion
        </h3>
        <h3 id="SecRol">
          Seleccione el Rol
        </h3>
        <span class="bar"></span>
      </div>
      <div class="ingresar w-100 relative" id="Ingresar">
        <div class="group mx-auto">
          <input type="number" id="CI" class="input" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Cedula</label>
        </div>
        <div class="group mx-auto">
          <input type="checkbox" id="show" name="show" class="group--visibleToggle" checked>
          <div class="group--visibleToggle-eye open">
            <img src="view\login\assets\img\eye-open.png" />
          </div>
          <div class="group--visibleToggle-eye close">
            <img src="view\login\assets\img\eye-close.png" />
          </div>
          <input id="pass" type="password" class="input" required maxlength="23">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Contraseña</label>
        </div>
        <div class="relative w-100 olvido">
          <p id="olvidar">
            ¿Has olvidado tu contraseña?
          </p>
        </div>
      </div>
      <div class="ingresar w-100 relative margintop scroll-box" id="ListadeRol">
      </div>
      <div class="centrar1 martop">
        <div class="button -blue relative" id="boton">
          <p id="Iniciar">
            Iniciar Sesion
          </p>
        </div>
        <div class="button -blue relative" id="boton1">
          <p id="Sec">
            Selecionar Rol
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none d-md-block w-100 footer row ceropad mt-auto ceromar relative">
    <div class="col cuarenta">
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
      <div class="col cuarenta">
        <div class="wrapper" id="ayuda">
          <div class="select-language">
            <div class="select-language-container">
              <p>
                ?
              </p>
            </div>
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