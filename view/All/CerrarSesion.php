<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '\controller\CerrarSesion.php';
$CerrarSesion = new controllerCerrarSesion;
$CerrarSesion->CerrarSesionsinLog();
