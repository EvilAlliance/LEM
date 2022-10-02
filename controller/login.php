<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/html/model/login.php';

    class login{

        public function __construct(){
        }
        //Llamo a la vista predeterminada
        public function Iniciar(){
            require_once $_SERVER['DOCUMENT_ROOT'].'/html/view/login/assets/index.php';
        }
        public function comprobarExiste($USER, $PASS){
            if($USER !== null && $PASS !== null){
                $usuario = new login();
                $user = $usuario->getUsuario($USER, $PASS);
                if($user !== "El usuario existe" && $user !== "El usuario no existe"){
                    $usuario->generarRegistro($user);
                }
                return $user; 
            }else{
                return "Error con los parametros";
            }
            
            
        }
        public function importarRoles($USER, $PASS){
            if($USER !== null && $PASS !== null){
                $Login = new login();
            #    $roles = $Login->getRoles($USER, $PASS);
              #  return $roles;  
            }else{
                return "Error con los parametros";
            }
        }
    }
?>