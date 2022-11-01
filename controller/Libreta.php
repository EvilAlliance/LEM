<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/Libreta.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/model/Log.php';

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
    public function SerCalificacion($CI, $Libretita, $nota, $tipo, $descripcion)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Estudiante = $model->SetCalificacion($CI, $Libretita, $nota, $tipo, $descripcion);
        return $Peticion;
    }
}
