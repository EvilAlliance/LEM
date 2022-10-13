<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/config/config.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/model/bd.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/controller/login.php';

    $login= new controllerLogin();
    $login->Iniciar();
?>