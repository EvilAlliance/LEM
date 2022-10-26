<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/config.php';

class Conectar
{

	private $host;
	private $db;
	private $conexion;

	public function __construct()
	{
		$this->host = constant('host');
		$this->db = constant('db');
	}

	public function Conexion($user, $pass)
	{
		$this->conexion = @mysqli_connect($this->host, $user, $pass, $this->db);
		if (!$this->conexion) {
			return "Error"; 
		} else {
			$this->conexion->set_charset("utf8");
			return $this->conexion;
		}
	}
}
