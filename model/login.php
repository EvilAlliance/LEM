<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/bd.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/config/config.php';

class modelLogin
{
    private $conexion;
    private $user;
    private $pass;

    public function __construct()
    {
        $this->user = constant('sesion');
        $this->pass = constant('sesionpass');
        $bd = new Conectar();
        $this->conexion = $bd->Conexion($this->user, $this->pass);
    }
    public function existeUsuario($CI, $pass)
    {
        $pass = hash('sha256', $pass);
        $query = "SELECT rol.CI, rol.Contrasena FROM Roles rol Where rol.CI = '$CI' AND rol.Contrasena = '$pass';";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                return "Error Peticion Cuenta" . mysqli_error($this->conexion);
            } else {
                if ($peticion->num_rows !== 1) {
                    return "Error Cuenta" . mysqli_error($this->conexion);
                } else if ($peticion->num_rows == 1) {
                    return "Existe Cuenta" . mysqli_error($this->conexion);
                }
            }
        } else {
            return "Error en la Base de Datos";
        }
    }

    public function Registro($CI, $Descirpcion)
    {
        $query = "INSERT INTO Registro(Seccion, Descripcion, Fecha) VALUE('Login', '$Descirpcion', NOW());";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                echo "Error Peticion Log" . mysqli_error($this->conexion);
            } else {
                if ($this->conexion !== "Error") {
                    $ID = mysqli_insert_id($this->conexion);
                    $query = "insert into Genera(ID, CI) value('$ID','$CI');";
                    $peticion = mysqli_query($this->conexion, $query);
                    if (!$peticion) {
                        echo "Error Peticion Genera" . mysqli_error($this->conexion);
                    }
                }
            }
        } else {
            echo "Error en la Base de Datos";
        }
    }

    public function ExisteSeguridad($CI)
    {
        $query = "SELECT COUNT(ID) AS Cantidad FROM Seguridad WHERE CI='$CI'";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                return "Error Peticion Cantidad Seguridad" . mysqli_error($this->conexion);
            } else {
                while($columna = mysqli_fetch_assoc($peticion)){
                    $Seguridad[] = array(
                        'Cantidad' => $columna['Cantidad'],   
                    );
                }
                echo $Seguridad[0]["Cantidad"];
            }
        } else {
            return "Error en la Base de Datos";
        }
    }
}
