<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/login.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/Log.php';

class controllerLogin
{
    public function Iniciar()
    {
        require $_SERVER['DOCUMENT_ROOT'].'/Amari/view/login/assets/index.php';
    }

    public function IniciarSesion($CI, $pass)
    {
        $Peticion = new stdClass();
        if ($CI !== null && $pass !== null) {
            $model = new modelLogin();
            $Peticion->Existe = $model->existeCuenta($CI, $pass);
            return  $Peticion;
            mysqli_close($this->conexion);
        } else {
            $Peticion->Resulado = "Error Vacio Controller";
            return  $Peticion;
        }
    }

    public function HaySeguridad($CI)
    {
        $Peticion = new stdClass();
        $model = new modelLogin();
        $Peticion->Cantidad = $model->ExisteSeguridad($CI);
        return $Peticion;
        mysqli_close($this->conexion);
    }

    public function InsertSeguridad($CI, $Pregunta, $Respuesta, $Descripcion, $Seccion)
    {
        $Peticion = new stdClass();
        if ($CI !== null && $Pregunta !== null && $Respuesta !== null) {
            $model = new modelLogin();
            $Peticion->Insert = $model->InsertSeguridad($CI, $Pregunta, $Respuesta);
            if ($Peticion->Insert->Resultado == "Exito Peticion Insert Seguridad") {
                $modelLog = new Log();
                $Peticion->Registro = $modelLog->Registro($CI, $Seccion, $Descripcion);
                return $Peticion;
                mysqli_close($this->conexion);
            }
        } else {
            $Peticion->Resulado = "Error Vacio Controller";
            return  $Peticion;
        }
    }

    public function GetCuenta($CI)
    {
        $Peticion = new stdClass();
        $model = new modelLogin();
        $Peticion->Existe = $model->existeUsuario($CI);
        return  $Peticion;
        mysqli_close($this->conexion);
    }

    public function Olvidar($CI, $Descripcion, $Seccion)
    {
        $Peticion = new stdClass();
        $model = new modelLogin();
        $Peticion->Seguridad = $model->GetSeguridad($CI);
        $modelLog = new Log();
        $Peticion->Registro = $modelLog->Registro($CI, $Seccion, $Descripcion);
        return $Peticion;
        mysqli_close($this->conexion);
    }

    public function importarRoles($CI)
    {
        $Peticion = new stdClass();
        $model = new modelLogin();
        $Peticion->Rol = $model->GetRol($CI);
        return $Peticion;
    }

    public function Pestana($Pestana, $Seccion, $CI, $Descripcion)
    {
        $modelLog = new Log();
        $modelLog->Registro($CI, $Seccion, $Descripcion);
        
        if ($Pestana==='Docente'){
            return '/Amari/view/Libreta/assets/index.php';
        }
    }
}
