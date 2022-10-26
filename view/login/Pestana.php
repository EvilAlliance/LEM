<?php
session_start();
$_SESSION['Rol'] = $_GET['pestana'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$controller = new controllerLogin;
$controller->Pestana($_SESSION['Rol']);