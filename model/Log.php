<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/bd.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/config/config.php';

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
        $query = "INSERT INTO Registro(Seccion, Descripcion, Fecha) VALUE('$Seccion', '$Descirpcion', NOW());";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Registra";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                $Devolver->Resultado = "Exito Peticion Registra";
                $Devolver->Error = mysqli_error($this->conexion);
                if ($this->conexion !== "Error") {
                    $ID = mysqli_insert_id($this->conexion);
                    $query = "insert into Genera(ID, CI) value('$ID','$CI');";
                    $peticion = mysqli_query($this->conexion, $query);
                    if (!$peticion) {
                        $Devolver->Resultado = "Error Peticion Genera";
                        $Devolver->Query = $query;
                        $Devolver->Error = mysqli_error($this->conexion);
                        return $Devolver;
                    } else {
                        $Devolver->Resultado = "Exito Peticion Genera";
                        $Devolver->Error = mysqli_error($this->conexion);
                        return $Devolver;
                    }
                } else {
                    $Devolver->Resultado = "Error en Base de Datos";
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
}
