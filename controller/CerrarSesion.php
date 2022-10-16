<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Log.php';

class controllerCerrarSesion
{
    public function CerrarSesion($CI, $Descripcion, $Seccion)
    {
        session_start();
        session_unset();
        session_destroy();
        $modelLog = new Log();
        $modelLog->Registro($CI, $Descripcion, $Seccion);
        mysqli_close($this->conexion);
    }

    public function CerrarSesionsinLog()
    {
        session_start();
        session_unset();
        session_destroy();
    }
}