<?php
$Libretita=$_POST['Libreta'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->CantidadInstanciaEscrito($Libretita);
echo json_encode($resultado);   