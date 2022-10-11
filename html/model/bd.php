<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/html/config/config.php';

class Conectar {

	private $host;
	private $db;
	private $user;
	private $pass;
	private $conexion;

	public function __construct(){
		$this->host = constant('DB_HOST');
		$this->db = constant('DB');
		$this->user = constant('DB_USER');
		$this->pass = constant('DB_PASS');
	}

	public function Conexion(){
        $this->conexion = @mysqli_connect($this->host, $this->user, $this->pass, $this->db);
		if (!$this->conexion) {
    		return "Fallo al conectar a MySQL";
		}else{
			$this->conexion->set_charset("utf8");
			return $this->conexion;
		}

	}

}