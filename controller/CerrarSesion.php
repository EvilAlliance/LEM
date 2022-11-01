<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/Log.php';

class controllerCerrarSesion
{
    public function CerrarSesion($CI, $Descripcion, $Seccion)
    {
        session_unset();
        session_destroy();
        $modelLog = new Log();
        $modelLog->Registro($CI, $Descripcion, $Seccion);
    }

    public function CerrarSesionsinLog()
    {
        session_unset();
        session_destroy();
    }
}
