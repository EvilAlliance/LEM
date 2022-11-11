<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/model/bd.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/config/config.php';

class Log
{
    private $conexion;
    private $user;

    public function __construct()
    {
        $this->user = constant('sesion');
        $this->pass = constant('sesionpass');
        $bd = new Conectar();
        $this->conexion = $bd->Conexion($this->user, $this->pass);
    }

    public function Registro($CI, $Seccion, $Descirpcion)
    {
        $Devolver = new stdClass();
        if ($this->conexion !== "Error") {
            $query = "INSERT INTO Registro(Seccion, Descripcion, Fecha) VALUE('$Seccion', '$Descirpcion', NOW());";
            $peticion = mysqli_query($this->conexion, $query);
            $Registro = new stdClass();
            if (!$peticion) {
                $Registro->Resultado = "Error Peticion Registra";
                $Registro->Query = $query;
                $Registro->Error = mysqli_error($this->conexion);
                $Devolver->Registro = $Registro;
                return $Devolver;
            } else {
                $Registro->Resultado = "Exito Peticion Registra";
                $ID = mysqli_insert_id($this->conexion);
                $query = "insert into Genera(ID, CI) value('$ID','$CI');";
                $peticion = mysqli_query($this->conexion, $query);
                $Devolver->Registro = $Registro;
                $Genera = new stdClass();
                if (!$peticion) {
                    $Genera->Resultado = "Error Peticion Genera";
                    $Genera->Query = $query;
                    $Genera->Error = mysqli_error($this->conexion);
                    $Devolver->Genera = $Genera;
                    return $Devolver;
                } else {
                    $Genera->Resultado = "Exito Peticion Genera";
                    $Devolver->Genera = $Genera;
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
}
