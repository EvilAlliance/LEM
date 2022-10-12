<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/html/model/login.php';

class controllerLogin
{

    public function __construct()
    {
    }
    //Llamo a la vista predeterminada
    public function Iniciar()
    {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/html/view/login/assets/index.php';
    }
    public function IniciarSesion($CI, $pass)
    {
        if ($CI !== null && $pass !== null) {
            $model = new modelLogin();
            $Cuenta = $model->existeUsuario($CI, $pass);
            if ($Cuenta == "Existe Cuenta") {
                   $model->Registro($CI);
            }
            return $Cuenta;
        } else {
            return "Error Vacio Controller";
        }
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
