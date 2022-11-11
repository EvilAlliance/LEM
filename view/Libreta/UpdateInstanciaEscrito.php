<?php
session_start();
$ID=$_POST['ID'];
$FechaRealizado=$_POST['FechaRealizado'];
$FechaEntregado=$_POST['FechaEntregado'];
$Funcionario=$_POST['Funcionario'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->UpdateInstanciaEscrito($_SESSION['CI'], $_SESSION['Seccion'], $ID, $FechaRealizado, $FechaEntregado, $Funcionario);
echo json_encode($resultado);   