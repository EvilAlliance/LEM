<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/Libreta.php';
$Libretita=$_POST['Libreta'];
$controller = new controllerLibreta;
$resultado = $controller->GetEstudiante($Libretita);
echo json_encode($resultado);
