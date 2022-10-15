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

    public function existeCuenta($CI, $pass)
    {
        $Devolver = new stdClass();
        $pass = hash('sha256', $pass);
        $query = "SELECT rol.CI, rol.Contrasena FROM Roles rol Where rol.CI = '$CI' AND rol.Contrasena = '$pass';";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cuenta";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 1) {
                    $Devolver->Resultado = "Error Cuenta";
                    $Devolver->Error = mysqli_error($this->conexion);
                    return $Devolver;
                } else if ($peticion->num_rows == 1) {
                    $Devolver->Resultado = "Existe Cuenta";
                    $Devolver->Error =  mysqli_error($this->conexion);
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function ExisteSeguridad($CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT COUNT(ID) AS Cantidad FROM Seguridad WHERE CI=$CI;";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Seguridad";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                $Devolver->Resultado = mysqli_fetch_assoc($peticion);
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function InsertSeguridad($CI, $Pregunta, $Respuesta)
    {
        $Devolver = new stdClass();
        $query = "INSERT INTO Seguridad(CI, Pregunta, Respuesta) VALUE('$CI', '$Pregunta', '$Respuesta');";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Insert Seguridad";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                $Devolver->Resultado = "Exito Peticion Insert Seguridad";
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function GetSeguridad($CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT Pregunta, Respuesta FROM Seguridad WHERE CI=$CI;";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Seguridad";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                while ($columna = mysqli_fetch_assoc($peticion)) {
                    $Seguridad[] = array(
                        'Pregunta' => $columna['Pregunta'],
                        'Respuesta' => $columna['Respuesta'],
                    );
                }
                $Devolver->Resultado = $Seguridad;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function existeUsuario($CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT rol.CI FROM Roles rol Where rol.CI = $CI;";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cuenta";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 1) {
                    $Devolver->Resultado = "Error Usuario";
                    $Devolver->Error = mysqli_error($this->conexion);
                    return $Devolver;
                } else if ($peticion->num_rows == 1) {
                    $Devolver->Resultado = "Existe Usuario";
                    $Devolver->Error = mysqli_error($this->conexion);
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
    public function GetRol($CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT Rol FROM Rol WHERE CI=$CI;";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Rol";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {;
                while ($fila = mysqli_fetch_assoc($peticion)) {
                    $Rol[] = array(
                        'Rol' => $fila['Rol'],
                    );
                }
                $Devolver->Resultado = $Rol;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
}
