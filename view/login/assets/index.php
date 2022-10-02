
<html>
<head> 
    <title> LEM </title>
    <link rel="stylesheet" type="text/css" href="view\login\assets\css\librerias\Primer\Primer.min.css">
    <link rel="stylesheet" type="text/css" href="view/login/assets/css/estilo.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body> 
    
      <div class="contenedor"> 
           <div class="sup"> </div>
         <div class="login"> 
            <img id="LogoL" src="img/LEM.png">
          <form method="post" class="">  
          <div class="input-group">
           <input type="text " id="name" required class="input">
           <label for="name" class="input-Label">
              Cedula
          </label>
          </div>
			    <div class="grupoform">    
              <input type="password" class="form_input" id="Contra" placeholder="Ingrese su Contraseña">         
			   </div>
            <div class="grupoform">

              <button class="btingresar" type="button" id="Login">ingresar</button>
			    </div>
          </form>  
         </div>
         <div class="bot"> </div>
      </div>
      <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script src="view/login/assets/js/jquery.min.js"></script>
      <script type="text/javascript" src="view/login/assets/js/Codigo.js"></script>  
</body>
</html>