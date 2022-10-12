<?php
    session_start();
    $_SESSION['CI'] = $_POST['CI'];
    $_SESSION['pass'] = $_POST['pass'];

    if($_SESSION['pass'] !== null &&  $_SESSION['CI'] !== null){
        require_once $_SERVER['DOCUMENT_ROOT'] . '/html/controller/login.php';
        $controller = new controllerLogin;
        $resultado = $controller->IniciarSesion($_SESSION['CI'], $_SESSION['pass']); 
        echo $resultado;
        return $resultado;
    }else{
        echo 'Error Set';
    }
?>