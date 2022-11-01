<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/config/config.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/bd.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/login.php';

    $login= new controllerLogin();
    $login->Iniciar();
?>