<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Libreta.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Log.php';

class controllerLibreta
{
    public function GetLibreta($CI)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Libreta = $model->GetLibreta($CI);
        return $Peticion;
    }
    public function GetEstudiante($Libretita)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Estudiante = $model->GetEstudiante($Libretita);
        return $Peticion;
    }
}
