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
            $("#menu").toggleClass("slidedown").animate({ left: '1%' }, 'slow');
            setTimeout(() => {
                $("#menu").hide() .toggleClass("slidedown");
            },600);
        } else {
            $("#menu").show().toggleClass("slidedown").animate({ left: '60px' }, 'slow');
            setTimeout(() => {
                $("#menu").toggleClass("slidedown");
            },600);
        }
    });
    $("#menu").on('click', function () {
        $("#menu").toggleClass("slideup").animate({ left: '1%' }, 'slow');
        setTimeout(() => {
            const primario = $("#primario").attr('src');
            const secundario = $("#secundario").attr('src');
            const classprimario = $("#primario").attr('class');
            const classsecundario = $("#secundario").attr('class');
            $("#primario").attr("src", secundario);
            $("#secundario").attr("src", primario);
            $("#primario").attr("class", classsecundario);
            $("#secundario").attr("class", classprimario);
            $("#menu").hide().toggleClass("slideup");
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
