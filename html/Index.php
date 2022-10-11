<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/html/config/config.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/html/model/bd.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/html/controller/login.php';

    $login= new login();
    $login->Iniciar();
?>