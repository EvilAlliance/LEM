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
        $query = "SELECT Roles.Nombre as Nombre, Roles.Apellido as Apellido, Dicta.Nombre as Asignatura, Dicta.Orientacion , Dicta.Curso, Dicta.Grado, Dicta.Grupo, Dicta.Turno, Dicta.Ano from Roles JOIN Docente on Roles.CI = Docente.CI JOIN Dicta on Docente.CI = Dicta.CI where Dicta.CI=$CI ORDER BY Nombre;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Libreta";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {;
                while ($columna = @mysqli_fetch_assoc($peticion)) {
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
                $Devolver->Error = @mysqli_error($this->conexion);
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
        $query = "SELECT Participa.CI, (select Roles.Nombre from Roles where Participa.CI=Roles.CI) as Nombre, (select Roles.Apellido from Roles where Participa.CI=Roles.CI) as Apellido, (select Roles.Foto from Roles where Participa.CI=Roles.CI) as Foto, (select Estudiante.Domicilio from Estudiante where Participa.CI=Estudiante.CI) as Domicilio from Participa where Ano=$Libretita[Año] and Curso='$Libretita[Curso]' and Orientacion='$Libretita[Orientacion]' and Grado=$Libretita[Grado] and Grupo='$Libretita[Grupo]' and Nombre='$Libretita[Asignatura]' and Turno='$Libretita[Turno]' ORDER BY Apellido;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Libreta";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 0) {
                    while ($columna = @mysqli_fetch_assoc($peticion)) {
                        $Estudiante[] = array(
                            'CI' => $columna['CI'],
                            'Nombre' => $columna['Apellido'],
                            'Apellido' => $columna['Nombre'],
                            'Orientacion' => $columna['Apellido'],
                            'Foto' => $columna['Foto'],
                            'Domicilio' => $columna['Domicilio']
                        );
                    }
                } else {
                    $Estudiante = "Vacio";
                }
            }
            $Devolver->Resultado = $Estudiante;
            $Devolver->Error = @mysqli_error($this->conexion);
            return $Devolver;
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
            $peticion = @mysqli_query($this->conexion, $query);
            $Calificacion = new stdClass();
            if (!$peticion) {
                $Calificacion->Resultado = "Error Peticion Insert Calificacion";
                $Calificacion->Query = $query;
                $Calificacion->Error = @mysqli_error($this->conexion);
                $Devolver->Calificacion = $Calificacion;
                return $Devolver;
            } else {
                $Calificacion->Resultado = "Exito Peticion Insert Calificacion";
                $ID = @mysqli_insert_id($this->conexion);
                $query = "INSERT INTO Consiguio(ID, CI, Nota) VALUE('$ID', '$CI', '$nota');";
                $peticion = @mysqli_query($this->conexion, $query);
                $Devolver->Calificacion = $Calificacion;
                $Nota = new stdClass();
                if (!$peticion) {
                    $Nota->Resultado = "Error Peticion Insert Nota";
                    $Nota->Query = $query;
                    $Nota->Error = @mysqli_error($this->conexion);
                    $Devolver->Nota = $Nota;
                    return $Devolver;
                } else {
                    $Nota->Resultado = "Exito Peticion Insert Nota";
                    $query = "INSERT INTO Pertenece(ID, Nombre, Orientacion, Curso, Grado, Grupo, Turno, Ano) VALUE('$ID', '" . $Libretita["Asignatura"] . "', '" . $Libretita["Orientacion"] . "', '" . $Libretita["Curso"] . "', '" . $Libretita["Grado"] . "', '" . $Libretita["Grupo"] . "', '" . $Libretita["Turno"] . "', " . $Libretita["Año"] . ");";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Devolver->Nota = $Nota;
                    $Pertenece = new stdClass();
                    if (!$peticion) {
                        $Pertenece->Resultado = "Error Peticion Insert Pertenece";
                        $Pertenece->Query = $query;
                        $Pertenece->Error = @mysqli_error($this->conexion);
                        $Devolver->Pertenece = $Pertenece;
                        return $Devolver;
                    } else {
                        $Pertenece->Resultado = "Exito Peticion Insert Pertenece";
                        $Devolver->Pertenece = $Pertenece;
                        return $Devolver;
                    }
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function CantidadInstanciaEscrito($Libretita)
    {
        $Devolver = new stdClass();
        $query = "SELECT count(Pertenece.ID) as Cantidad FROM Pertenece WHERE Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . " AND Pertenece.ID IN (SELECT Trabajos_Escritos.ID FROM Trabajos_Escritos);";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                $Devolver->Resultado = @mysqli_fetch_assoc($peticion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function CantidadInstanciaEscritoCI($Libretita, $CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT count(Consiguio.ID) as Cantidad FROM Consiguio WHERE Consiguio.CI='$CI' AND Consiguio.ID IN (SELECT Calificacion.ID FROM Calificacion where Tipo='TE') and Consiguio.ID IN (SELECT Pertenece.ID FROM Pertenece WHERE Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano='" . $Libretita["Año"] . "');";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito CI";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                $Devolver->Resultado = @mysqli_fetch_assoc($peticion);
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function InsertInstanciaEscrito($Libretita, $FechaRealizado, $FechaEntregado, $Funcionario)
    {
        $Devolver = new stdClass();
        $query = "INSERT INTO Calificacion(Fecha, Tipo, Descripcion) VALUE(now(), 'IE', '');";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            $Calificacion = new stdClass();
            if (!$peticion) {
                $Calificacion->Resultado = "Error Peticion Insert Calificacion";
                $Calificacion->Query = $query;
                $Calificacion->Error = @mysqli_error($this->conexion);
                $Devolver->Calificacion = $Calificacion;
                return $Devolver;
            } else {
                $Calificacion->Resultado = "Exito Peticion Insert Calificacion";
                $ID = @mysqli_insert_id($this->conexion);
                $query = "INSERT INTO Trabajos_Escritos(ID, Fecha_Realizado, Fecha_Entrega, Funcionario) VALUE('$ID', '$FechaRealizado', '$FechaEntregado', '$Funcionario');";
                $peticion = @mysqli_query($this->conexion, $query);
                $Devolver->Calificacion = $Calificacion;
                $Escrito = new stdClass();
                if (!$peticion) {
                    $Escrito->Resultado = "Error Peticion Insert Nota";
                    $Escrito->Query = $query;
                    $Escrito->Error = @mysqli_error($this->conexion);
                    $Devolver->Escrito = $Escrito;
                    return $Devolver;
                } else {
                    $Escrito->Resultado = "Exito Peticion Insert Nota";
                    $Devolver->Escrito = $Escrito;
                    $query = "INSERT INTO Pertenece(ID, Nombre, Orientacion, Curso, Grado, Grupo, Turno, Ano) VALUE('$ID', '" . $Libretita["Asignatura"] . "', '" . $Libretita["Orientacion"] . "', '" . $Libretita["Curso"] . "', '" . $Libretita["Grado"] . "', '" . $Libretita["Grupo"] . "', '" . $Libretita["Turno"] . "', " . $Libretita["Año"] . ");";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Pertenece = new stdClass();
                    if (!$peticion) {
                        $Pertenece->Resultado = "Error Peticion Insert Pertenece";
                        $Pertenece->Query = $query;
                        $Pertenece->Error = @mysqli_error($this->conexion);
                        $Devolver->Pertenece = $Pertenece;
                        return $Devolver;
                    } else {
                        $Pertenece->Resultado = "Exito Peticion Insert Pertenece";
                        $Devolver->Pertenece = $Pertenece;
                        return $Devolver;
                    }
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function GetInstanciaEscrito($Libretita)
    {
        $Devolver = new stdClass();
        $query = "SELECT * FROM Trabajos_Escritos WHERE Trabajos_Escritos.ID IN (SELECT Pertenece.ID FROM Pertenece WHERE Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . " AND Pertenece.ID) ORDER BY Fecha_Realizado;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito CI";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 0) {
                    while ($columna = @mysqli_fetch_assoc($peticion)) {
                        $Instancia[] = array(
                            'Fecha_Realizado' => $columna['Fecha_Realizado'],
                            'Fecha_Entrega' => $columna['Fecha_Entrega'],
                            'Funcionario' => $columna['Funcionario'],
                            'ID' => $columna['ID']
                        );
                    }
                } else {
                    $Instancia = "Vacio";
                }
                $Devolver->Resultado = $Instancia;
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function UpdateInstanciaEscrito($ID, $FechaRealizado, $FechaEntregado, $Funcionario)
    {
        $Devolver = new stdClass();
        $query = "UPDATE Trabajos_Escritos SET Fecha_Entrega='$FechaEntregado', Fecha_Realizado='$FechaRealizado', Funcionario= '$Funcionario'  WHERE Trabajos_Escritos.ID=$ID;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito CI";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {

                $Devolver->Resultado = "Exito Peticion Cantidad Instancia Escrito CI";
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function GetCalificacion($Libretita, $CI)
    {
        $Devolver = new stdClass();
        $query = "SELECT Consiguio.ID, Calificacion.Tipo, Calificacion.Descripcion, Calificacion.Fecha, Consiguio.Nota FROM Pertenece JOIN Consiguio ON Pertenece.ID = Consiguio.ID JOIN Calificacion on Calificacion.ID = Consiguio.ID WHERE Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . " AND Consiguio.CI = $CI AND Consiguio.ID NOT IN (SELECT ID FROM Promedio) and Consiguio.ID NOT IN (SELECT ID FROM Trabajos_Escritos) ORDER BY Calificacion.Fecha DESC;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 0) {
                    while ($columna = @mysqli_fetch_assoc($peticion)) {
                        $Calificacion[] = array(
                            'ID' => $columna['ID'],
                            'Tipo' => $columna['Tipo'],
                            'Descripcion' => $columna['Descripcion'],
                            'Nota' => $columna['Nota'],
                            'Fecha' => $columna['Fecha']
                        );
                    }
                } else {
                    $Calificacion = "Vacio";
                }
                $Devolver->Resultado = $Calificacion;
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function UpdateCalificacion($ID, $nota, $tipo, $descripcion)
    {
        $Devolver = new stdClass();
        $query = "UPDATE Calificacion SET Tipo='$tipo', Descripcion='$descripcion' WHERE ID=$ID;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            $Calificacion = new stdClass();
            if (!$peticion) {
                $Calificacion->Resultado = "Error Peticion Update Calificacion";
                $Calificacion->Query = $query;
                $Calificacion->Error = @mysqli_error($this->conexion);
                $Devolver->Calificacion = $Calificacion;
                return $Devolver;
            } else {
                $Calificacion->Resultado = "Exito Peticion Update Calificacion";
                $query = "UPDATE Consiguio SET Nota='$nota' WHERE  ID=$ID;";
                $peticion = @mysqli_query($this->conexion, $query);
                $Devolver->Calificacion = $Calificacion;
                $Nota = new stdClass();
                if (!$peticion) {
                    $Nota->Resultado = "Error Peticion Update Nota";
                    $Nota->Query = $query;
                    $Nota->Error = @mysqli_error($this->conexion);
                    $Devolver->Nota = $Nota;
                    return $Devolver;
                } else {
                    $Nota->Resultado = "Exito Peticion Update Nota";
                    $Devolver->Nota = $Nota;
                    return $Devolver;
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function DeleteCalificacion($ID)
    {
        $Devolver = new stdClass();
        $query = "DELETE FROM Consiguio WHERE  ID=$ID;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            $Nota = new stdClass();
            if (!$peticion) {
                $Nota->Resultado = "Error Peticion Update Calificacion";
                $Nota->Query = $query;
                $Nota->Error = @mysqli_error($this->conexion);
                $Devolver->Nota = $Nota;
                return $Devolver;
            } else {
                $Nota->Resultado = "Exito Peticion Update Calificacion";
                $query = "DELETE FROM Pertenece WHERE ID=$ID;";
                $peticion = @mysqli_query($this->conexion, $query);
                $Devolver->Nota = $Nota;
                $Pertenece = new stdClass();
                if (!$peticion) {
                    $Pertenece->Resultado = "Error Peticion Update Nota";
                    $Pertenece->Query = $query;
                    $Pertenece->Error = @mysqli_error($this->conexion);
                    $Devolver->Pertenece = $Pertenece;
                } else {
                    $Pertenece->Resultado = "Exito Peticion Update Nota";
                    $Devolver->Calificacion = $Pertenece;
                    $query = "DELETE FROM Calificacion WHERE ID=$ID;";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Devolver->Pertenece = $Pertenece;
                    $Calificacion = new stdClass();
                    if (!$peticion) {
                        $Calificacion->Resultado = "Error Peticion Update Nota";
                        $Calificacion->Query = $query;
                        $Calificacion->Error = @mysqli_error($this->conexion);
                        $Devolver->Calificacion = $Calificacion;
                        return $Devolver;
                    } else {
                        $Calificacion->Resultado = "Exito Peticion Update Nota";
                        $Devolver->Calificacion = $Calificacion;
                        return $Devolver;
                    }
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function GetPromedio($Libretita, $CI, $Periodo)
    {
        $Devolver = new stdClass();
        $query = "SELECT Consiguio.Nota FROM Pertenece JOIN Consiguio ON Pertenece.ID = Consiguio.ID JOIN Promedio on Promedio.ID = Consiguio.ID WHERE Promedio.Periodo='" . $Periodo . "' AND Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . " AND Consiguio.CI = $CI AND Consiguio.ID IN (SELECT ID FROM Promedio);";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Promedio";
                $Devolver->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 0) {
                    while ($columna = @mysqli_fetch_assoc($peticion)) {
                        $Promedio[] = array(
                            'Nota' => $columna['Nota'],
                        );
                    }
                } else {
                    $Promedio = "Vacio";
                }
                $Devolver->Resultado = $Promedio;
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function SetPromedio($CI, $Libretita, $nota, $tipo, $Periodo)
    {
        $Devolver = new stdClass();
        $query = "INSERT INTO Calificacion(Fecha, Tipo, Descripcion) VALUE(now(), '$tipo', '$Periodo');";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            $Calificacion = new stdClass();
            if (!$peticion) {
                $Calificacion->Resultado = "Error Peticion Insert Calificacion";
                $Calificacion->Query = $query;
                $Calificacion->Error = @mysqli_error($this->conexion);
                $Devolver->Calificacion = $Calificacion;
                return $Devolver;
            } else {
                $Calificacion->Resultado = "Exito Peticion Insert Calificacion";
                $ID = @mysqli_insert_id($this->conexion);
                $query = "INSERT INTO Consiguio(ID, CI, Nota) VALUE('$ID', '$CI', '$nota');";
                $peticion = @mysqli_query($this->conexion, $query);
                $Devolver->Calificacion = $Calificacion;
                $Nota = new stdClass();
                if (!$peticion) {
                    $Nota->Resultado = "Error Peticion Insert Nota";
                    $Nota->Query = $query;
                    $Nota->Error = @mysqli_error($this->conexion);
                    $Devolver->Nota = $Nota;
                    return $Devolver;
                } else {
                    $Nota->Resultado = "Exito Peticion Insert Nota";
                    $query = "INSERT INTO Pertenece(ID, Nombre, Orientacion, Curso, Grado, Grupo, Turno, Ano) VALUE('$ID', '" . $Libretita["Asignatura"] . "', '" . $Libretita["Orientacion"] . "', '" . $Libretita["Curso"] . "', '" . $Libretita["Grado"] . "', '" . $Libretita["Grupo"] . "', '" . $Libretita["Turno"] . "', " . $Libretita["Año"] . ");";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Devolver->Nota = $Nota;
                    $Pertenece = new stdClass();
                    if (!$peticion) {
                        $Pertenece->Resultado = "Error Peticion Insert Pertenece";
                        $Pertenece->Query = $query;
                        $Pertenece->Error = @mysqli_error($this->conexion);
                        $Devolver->Pertenece = $Pertenece;
                        return $Devolver;
                    } else {
                        $Pertenece->Resultado = "Exito Peticion Insert Pertenece";
                        $Devolver->Pertenece = $Pertenece;
                        $query = "INSERT INTO Promedio(ID, Periodo) VALUE('$ID', '$Periodo');";
                        $peticion = @mysqli_query($this->conexion, $query);
                        $Devolver->Nota = $Nota;
                        $Promedio = new stdClass();
                        if (!$peticion) {
                            $Promedio->Resultado = "Error Peticion Insert Promedio";
                            $Promedio->Query = $query;
                            $Promedio->Error = @mysqli_error($this->conexion);
                            $Devolver->Promedio = $Promedio;
                            return $Devolver;
                        } else {
                            $Promedio->Resultado = "Exito Peticion Insert Promedio";
                            $Devolver->Promedio = $Promedio;
                            return $Devolver;
                        }
                    }
                }
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function GetClase($Libretita, $Fecha)
    {
        $Devolver = new stdClass();
        $query = "SELECT Clase.ID, Atiende.Asiste, Atiende.CI, Clase.Modulo, Clase.Estado AS Estado, De.Estado AS Estado1 FROM Clase JOIN De ON Clase.ID = De.ID JOIN Atiende on Clase.ID = Atiende.ID WHERE Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . " AND Clase.Fecha = '$Fecha' ORDER BY Atiende.CI;";
        if ($this->conexion !== "Error") {
            $peticion = @mysqli_query($this->conexion, $query);
            if (!$peticion) {
                $Devolver->Resultado = "Error Peticion Cantidad Instancia Escrito";
                $Devolver->Modulover->Query = $query;
                $Devolver->Error = @mysqli_error($this->conexion);
                return $Devolver;
            } else {
                if ($peticion->num_rows !== 0) {
                    while ($columna = @mysqli_fetch_assoc($peticion)) {
                        $Clase[] = array(
                            'ID' => $columna['ID'],
                            'Asiste' => $columna['Asiste'],
                            'CI' => $columna['CI'],
                            'Modulo' => $columna['Modulo'],
                            'Estado' => $columna['Estado'],
                            'Estado1' => $columna['Estado1']
                        );
                    }
                } else {
                    $Clase = "Vacio";
                }
                $Devolver->Resultado = $Clase;
                return $Devolver;
            }
        } else {
            $Devolver->Resultado = "Error en Base de Datos";
            return $Devolver;
        }
    }

    public function SetClase($Libretita, $Modulo, $Fecha, $Alumno, $Estado)
    {
        $Devolver = new stdClass();
        for ($i = 1; $i <= $Modulo; $i++) {
            $jota = new stdClass();
            $query = "INSERT INTO Clase(Modulo, Fecha) VALUE($i, '$Fecha');";
            if ($this->conexion !== "Error") {
                $peticion = @mysqli_query($this->conexion, $query);
                $Clase = new stdClass();
                if (!$peticion) {
                    $Clase->Resultado = "Error Peticion Insert Clase";
                    $Clase->Query = $query;
                    $Clase->Error = @mysqli_error($this->conexion);
                    $jota->Clase = $Clase;
                } else {
                    $Clase->Resultado = "Exito Peticion Insert Clase";
                    $jota->Clase  = $Clase;
                    $ID = @mysqli_insert_id($this->conexion);
                    $query = "INSERT INTO De(ID, Nombre, Orientacion, Curso, Grado, Grupo, Turno, Ano, Estado) VALUE('$ID', '" . $Libretita["Asignatura"] . "', '" . $Libretita["Orientacion"] . "', '" . $Libretita["Curso"] . "', '" . $Libretita["Grado"] . "', '" . $Libretita["Grupo"] . "', '" . $Libretita["Turno"] . "', " . $Libretita["Año"] . ", '$Estado');";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $De = new stdClass();
                    if (!$peticion) {
                        $De->Resultado = "Error Peticion Insert Pertenece";
                        $De->Query = $query;
                        $De->Error = @mysqli_error($this->conexion);
                        $jota->De = $De;
                    } else {
                        $De->Resultado = "Exito Peticion Insert Pertenece";
                        $jota->De = $De;
                    }
                }
            } else {
                $jota->Resultado = "Error en Base de Datos";
            }
            for ($j = 0; $j < count($Alumno); $j++) {
                $For = new stdClass();
                if ($this->conexion !== "Error") {
                    $query = "INSERT INTO Atiende(ID, CI, Asiste) VALUE('$ID', '" . $Alumno[$j][0] . "', '" . $Alumno[$j][$i] . "');";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Atiende = new stdClass();
                    if (!$peticion) {
                        $Atiende->Resultado = "Error Peticion Insert Nota";
                        $Atiende->Query = $query;
                        $Atiende->Error = @mysqli_error($this->conexion);
                        $For->Atiende = $Atiende;
                    } else {
                        $Atiende->Resultado = "Exito Peticion Insert Nota";
                        $For->Atiende = $Atiende;
                    }
                } else {
                    $For->Resultado = "Error en Base de Datos";
                }
                $jota->$j = $For;
            }
            $Devolver->$i =  $jota;
        }
        return $jota;
    }

    public function UpdateClase($Modulo, $Alumno, $Estado, $ID, $Libretita)
    {
        $Devolver = new stdClass();
        for ($i = 1; $i <= $Modulo; $i++) {
            $jota = new stdClass();
            $query = "UPDATE De SET Estado='" . $Estado . "'  WHERE ID='" . $ID[($i - 1)] . "' AND Nombre='" . $Libretita["Asignatura"] . "' AND Orientacion='" . $Libretita["Orientacion"] . "' AND Curso='" . $Libretita["Curso"] . "' AND Grado='" . $Libretita["Grado"] . "' AND Grupo='" . $Libretita["Grupo"] . "' AND Turno='" . $Libretita["Turno"] . "' AND Ano=" . $Libretita["Año"] . ";";
            if ($this->conexion !== "Error") {
                $peticion = @mysqli_query($this->conexion, $query);
                if ($this->conexion !== "Error") {
                    $peticion = @mysqli_query($this->conexion, $query);
                    $De = new stdClass();
                    if (!$peticion) {
                        $De->Resultado = "Error Peticion Update De";
                        $De->Query = $query;
                        $De->Error = @mysqli_error($this->conexion);
                        $jota->De = $De;
                    } else {
                        $De->Resultado = "Exito Peticion Update De";
                        $jota->De  = $De;
                    }
                } else {
                    $jota->Resultado = "Error en Base de Datos";
                }
            }
            for ($j = 0; $j < count($Alumno); $j++) {
                $For = new stdClass();
                if ($this->conexion !== "Error") {
                    $query = "UPDATE Atiende SET Asiste='" . $Alumno[$j][$i] . "'  WHERE ID='" . $ID[($i - 1)] . "' AND CI='" . $Alumno[$j][0] . "';";
                    $peticion = @mysqli_query($this->conexion, $query);
                    $Atiende = new stdClass();
                    if (!$peticion) {
                        $Atiende->Resultado = "Error Peticion Update Atiende";
                        $Atiende->Query = $query;
                        $Atiende->Error = @mysqli_error($this->conexion);
                        $For->Atiende = $Atiende;
                    } else {
                        $Atiende->Resultado = "Exito Peticion Update Atiende";
                        $For->Atiende = $Atiende;
                    }
                } else {
                    $For->Resultado = "Error en Base de Datos";
                }
                $jota->$j = $For;
            }
            $Devolver->$i =  $jota;
        }
        return $jota;
    }
}
