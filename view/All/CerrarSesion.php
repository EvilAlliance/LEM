<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/CerrarSesion.php';
$CerrarSesion = new controllerCerrarSesion;
$CerrarSesion->CerrarSesionsinLog();
