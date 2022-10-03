$(window).ready(
    function(){
        document.title = "Inicio de Sesion";
    }
);

$(document).ready(
    function(){
        reloj();
        setInterval(reloj, 60000);
        bandera();
    }
);

window.addEventListener(
    "visibilitychange", () => {
        if (document.visibilityState == "hidden"){
            document.title = "LEM";
        }else {
            document.title = "Inicio de Sesion";
        }
    } 
);

const reloj = () => 
{
    const text = document.getElementById("reloj");
    text.innerHTML = moment().format('DD/MM/YY hh:mm'); 
};
