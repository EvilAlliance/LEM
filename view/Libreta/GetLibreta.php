<?php
session_start();
if (isset($_SESSION['CI'])){
    require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/Libreta.php';
    $controller = new controllerLibreta;
    $resultado = $controller->GetLibreta($_SESSION['CI']);
    echo json_encode($resultado);
} else {
    echo "";
}
