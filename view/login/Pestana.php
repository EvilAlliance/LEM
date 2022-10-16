<?php
session_start();
$Pestana = $_GET['pestana'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$controller = new controllerLogin;
$controller->Pestana($Pestana);