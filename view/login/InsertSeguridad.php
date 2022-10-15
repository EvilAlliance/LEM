<?php
session_start();
$Pregunta=$_POST['Pregunta'];
$Respuesta=$_POST['Respuesta'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$controller = new controllerLogin;
$resultado = $controller->InsertSeguridad($_SESSION['CI'], $Pregunta, $Respuesta, 'Insert Seguridad Pregunta y Repuesta', $_SESSION['Seccion']);
echo json_encode($resultado);