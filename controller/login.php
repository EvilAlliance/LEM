<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/login.php';

class controllerLogin
{

    public function __construct()
    {
    }
    //Llamo a la vista predeterminada
    public function Iniciar()
    {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/view/login/assets/index.php';
    }
    public function IniciarSesion($CI, $pass, $Descirpcion)
    {
        if ($CI !== null && $pass !== null) {
            $model = new modelLogin();
            $Cuenta = $model->existeUsuario($CI, $pass);
            if ($Cuenta == "Existe Cuenta") {
                $model->Registro($CI, $Descirpcion);
            }
            return $Cuenta;
        } else {
            return "Error Vacio Controller";
        }
    }

    public function HaySeguridad($CI)
    {
        $model = new modelLogin();
        $Cantidad = $model->ExisteSeguridad($CI);
        return $Cantidad;
    }
    /*
        public function importarRoles($USER, $PASS){
            if($USER !== null && $PASS !== null){
                $Login = new login();
            #    $roles = $Login->getRoles($USER, $PASS);
              #  return $roles;  
            }else{
                return "Error con los parametros";
            }
        }
         */
}
