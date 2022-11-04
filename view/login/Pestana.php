<?php
session_start();
$_SESSION['Rol'] = $_GET['pestana'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/login.php';
$controller = new controllerLogin;
$url=$controller->Pestana($_SESSION['Rol'], $_SESSION['Seccion'], $_SESSION['CI'], 'Inicio Sesion');
echo $url;