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
    public function SerCalificacion($CI, $Libretita, $nota, $tipo, $descripcion, $CIDocente, $Seccion)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Calificacion = $model->SetCalificacion($CI, $Libretita, $nota, $tipo, $descripcion);
        $log = new Log();
        $Peticion->Log = $log->Registro($CIDocente, $Seccion, "Alta de Calificacion Tipo: $tipo Nota: $nota al Alumno: $CI");
        return $Peticion;
    }

    public function CantidadInstanciaEscrito($Libretita)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Cantidad = $model->CantidadInstanciaEscrito($Libretita);
        return $Peticion;
    }

    public function CantidadInstanciaEscritoCI($Libretita, $CI)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Cantidad = $model->CantidadInstanciaEscritoCI($Libretita, $CI);
        return $Peticion;
    }

    public function InsertInstanciaEscrito($CI, $Seccion, $Libretita, $FechaRealizado, $FechaEntregado, $Funcionario)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Insert = $model->InsertInstanciaEscrito($Libretita, $FechaRealizado, $FechaEntregado, $Funcionario );
        $log = new Log();
        $Peticion->Log = $log->Registro($CI, $Seccion, "Alta de Intancia de Escrito FechaRealizado: $FechaRealizado FechaEntregado: $FechaEntregado Funcionario: $Funcionario");
        return $Peticion;
    }

    public function GetInstanciaEscrito($Libretita)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Instancia = $model->GetInstanciaEscrito($Libretita);
        return $Peticion;
    }

    public function UpdateInstanciaEscrito($CI, $Seccion, $ID, $FechaRealizado, $FechaEntregado, $Funcionario)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $log = new Log();
        $Peticion->Instancia = $model->UpdateInstanciaEscrito($ID, $FechaRealizado, $FechaEntregado, $Funcionario);
        $Peticion->Log = $log->Registro($CI, $Seccion, "Modificacion de Intancia de Escrito FechaRealizado: $FechaRealizado FechaEntregado: $FechaEntregado Funcionario: $Funcionario");
        return $Peticion;
    }

    public function GetCalificacion($Libretita, $CI)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Calificacion= $model->GetCalificacion($Libretita, $CI);
        return $Peticion;
    }

    public function UpdateCalificacion($ID, $nota, $tipo, $descripcion, $CIDocente, $Seccion)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Calificacion = $model->UpdateCalificacion($ID, $nota, $tipo, $descripcion);
        $log = new Log();
        $Peticion->Log = $log->Registro($CIDocente, $Seccion, "Modificacion de Calificacion Tipo: $tipo Nota: $nota al ID: $ID");
        return $Peticion;
    }

    public function DeleteCalificacion($ID, $CIDocente, $Seccion)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Calificacion = $model->DeleteCalificacion($ID);
        $log = new Log();
        $Peticion->Log = $log->Registro($CIDocente, $Seccion, "Elimino Calificacion de ID: $ID");
        return $Peticion;
    }

    public function GetPromedio($Libretita, $CI, $Periodo)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Promedio= $model->GetPromedio($Libretita, $CI, $Periodo);
        return $Peticion;
    }

    public function SetPromedio($CI, $Libretita, $nota, $tipo, $Periodo, $CIDocente, $Seccion)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Calificacion = $model->SetPromedio($CI, $Libretita, $nota, $tipo, $Periodo);
        $log = new Log();
        $Peticion->Log = $log->Registro($CIDocente, $Seccion, "Alta de Promedio Nota: $nota al Alumno: $CI");
        return $Peticion;
    }

    public function GetClase($Libretita, $Fecha)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Clase= $model->GetClase($Libretita, $Fecha);
        return $Peticion;
    }

    public function SetClase($Libretita, $Modulo, $Fecha, $Alumno, $Estado)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Clase= $model->SetClase($Libretita, $Modulo, $Fecha, $Alumno, $Estado);
        return $Peticion;
    }

    public function UpdateClase($Modulo, $Alumno, $Estado, $ID, $Libretita)
    {
        $Peticion = new stdClass();
        $model = new modelLibreta();
        $Peticion->Clase= $model->UpdateClase($Modulo, $Alumno, $Estado, $ID, $Libretita);
        return $Peticion;
    }
}
