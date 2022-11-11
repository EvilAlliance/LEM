<?php
session_start();
$Libretita=$_POST['Libreta'];
$FechaRealizado=$_POST['FechaRealizado'];
$FechaEntregado=$_POST['FechaEntregado'];
$Funcionario=$_POST['Funcionario'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->InsertInstanciaEscrito($_SESSION['CI'], $_SESSION['Seccion'], $Libretita, $FechaRealizado, $FechaEntregado, $Funcionario);
echo json_encode($resultado);   