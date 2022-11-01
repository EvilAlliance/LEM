<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/model/bd.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/config/config.php';

class modelLibreta
{
    private $conexion;
    private $user;
    private $pass;

    public function __construct()
    {
        $this->user = constant('docente');
        $this->pass = constant('docentepass');
        $bd = new Conectar();
        $this->conexion = $bd->Conexion($this->user, $this->pass);
    }

    public function GetLibreta($CI)
    {
        $Devolver = new stdClass();
        $query = "select Roles.Nombre as Nombre, Roles.Apellido as Apellido, Dicta.Nombre as Asignatura, Dicta.Orientacion , Dicta.Curso, Dicta.Grado, Dicta.Grupo, Dicta.Turno, Dicta.Ano from Roles JOIN Docente on Roles.CI = Docente.CI JOIN Dicta on Docente.CI = Dicta.CI where Dicta.CI=$CI;";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Libreta";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {;
                while ($columna = mysqli_fetch_assoc($peticion)) {
                    $Libreta[] = array(
                        'Nombre' => $columna['Nombre'],
                        'Apellido' => $columna['Apellido'],
                        'Asignatura' => $columna['Asignatura'],
                        'Orientacion' => $columna['Orientacion'],
                        'Curso' => $columna['Curso'],
                        'Grupo' => $columna['Grupo'],
                        'Grado' => $columna['Grado'],
                        'Año' => $columna['Ano'],
                        'Turno' => $columna['Turno']
                    );
                }
                $Devolver->Resultado = $Libreta;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
    public function GetEstudiante($Libretita)
    {
        $Devolver = new stdClass();
        $query = "select Participa.CI, (select Roles.Nombre from Roles where Participa.CI=Roles.CI) as Nombre, (select Roles.Apellido from Roles where Participa.CI=Roles.CI) as Apellido, (select Roles.Foto from Roles where Participa.CI=Roles.CI) as Foto, (select Estudiante.Domicilio from Estudiante where Participa.CI=Estudiante.CI) as Domicilio from Participa where Ano=$Libretita[Año] and Curso='$Libretita[Curso]' and Orientacion='$Libretita[Orientacion]' and Grado=$Libretita[Grado] and Grupo='$Libretita[Grupo]' and Nombre='$Libretita[Asignatura]' and Turno='$Libretita[Turno]';";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Libreta";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            } else {;
                while ($columna = mysqli_fetch_assoc($peticion)) {
                    $Estudiante[] = array(
                        'CI' => $columna['CI'],
                        'Nombre' => $columna['Apellido'],
                        'Apellido' => $columna['Nombre'],
                        'Orientacion' => $columna['Apellido'],
                        'Foto' => $columna['Foto'],
                        'Domicilio' => $columna['Domicilio']
                    );
                }
                $Devolver->Resultado = $Estudiante;
                $Devolver->Error = mysqli_error($this->conexion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
    public function SetCalificacion($CI, $Libretita, $nota, $tipo, $descripcion)
    {
        $Devolver = new stdClass();
        $query = "INSERT INTO Calificacion(Fecha, Tipo, Descripcion) VALUE(now(), '$tipo', '$descripcion');";
        if ($this->conexion !== "Error") {
            $peticion = mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Insert Seguridad";
                $Devolver->Query = $query;
                $Devolver->Error = mysqli_error($this->conexion);
            } else {
                $Devolver->Resultado = "Exito Peticion Insert Seguridad";
                $ID = mysqli_insert_id($this->conexion);
                $query = "INSERT INTO Consiguio(ID, CI, Nota) VALUE('$ID', '$CI', '$nota');";
                $peticion = mysqli_query($this->conexion, $query);
                if (!$peticion) {
                    $Devolver->Resultado = "Error Peticion Insert Seguridad";
                    $Devolver->Query = $query;
                    $Devolver->Error = mysqli_error($this->conexion);
                } else {
                    $Devolver->Resultado = "Exito Peticion Insert Seguridad";
                    $query = "INSERT INTO Pertenece(ID, Nombre, Orientacion, Curso, Grado, Turno, Ano) VALUE('$ID', '$Libretita[Asignatura]', '$Libretita[Orientacion]', '$Libretita[Curso]', '$Libretita[Grado]', '$Libretita[Grado]', '$Libretita[Grupo]', '$Libretita[Turno]', $Libretita[Año]);";
                    $peticion = mysqli_query($this->conexion, $query);
                    $Devolver->Error = mysqli_error($this->conexion);
                    return $Devolver;
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }
}
