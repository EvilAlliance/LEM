$(window).ready(function () {
    document.title = "Inicio de Sesion";
    $("#menu").hide();
    reloj();
    setInterval(reloj, 1000);
});

$(document).ready(function () {
    $("#seleccionado").on('click', function () {
        console.log('click');
        if ($("#menu").css('display') != 'none') {
            console.log('perra ');
            $("#menu").animate({ left: '0px' }, 'slow');
            setTimeout(() => {
                $("#menu").hide();
            },600);
        } else {
            $("#menu").show().animate({ left: '50px' }, 1000);
        }
    });
    $("#menu").on('click', function () {
        $("#menu").toggleClass("slide").animate({ left: '0px' }, 'slow');
        setTimeout(() => {
            const primario = $("#primario").attr('src');
            const secundario = $("#secundario").attr('src');
            const classprimario = $("#primario").attr('class');
            const classsecundario = $("#secundario").attr('class');
            $("#primario").attr("src", secundario);
            $("#secundario").attr("src", primario);
            $("#primario").attr("class", classsecundario);
            $("#secundario").attr("class", classprimario);
            $("#menu").hide().toggleClass("slide");
        }, 600);
    });
});

window.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "LEM";
    } else {
        document.title = "Inicio de Sesion";
    }
});

const reloj = () => {
    const text = document.getElementById("reloj");
    text.innerHTML = moment().format('DD/MM/YY hh:mm');
};
