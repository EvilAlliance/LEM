$(window).ready(function () {
    document.title = "Inicio de Sesion";
    $("#menu").hide();
    $("#menu1").hide();
    reloj();
    setInterval(reloj, 1000);
});

$(document).ready(function () {
    $("#seleccionado").on('click', function () {
        console.log('idioma');
        if ($("#menu").css('display') != 'none') {
            $("#menu").toggleClass("slidedown").animate({ left: '1%' }, 'slow');
            $("#ayuda").animate({ left: '60px' }, 'slow');
            setTimeout(() => {
                $("#menu").hide() .toggleClass("slidedown");
            },600);
        } else {
            $("#menu").show().toggleClass("slidedown").animate({ left: '60px' }, 'slow');
            $("#ayuda").animate({ left: '110px' }, 'slow');
            setTimeout(() => {
                $("#menu").toggleClass("slidedown");
            },600);
        }
    });
    $("#menu").on('click', function () {
        $("#menu").toggleClass("slideup").animate({ left: '1%' }, 'slow');
        $("#ayuda").animate({ left: '60px' }, 'slow');
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
    $("#seleccionado1").on('click', function () {
        console.log('idioma');
        if ($("#menu1").css('display') != 'none') {
            $("#menu1").toggleClass("slidedown").animate({ top: '1%' }, 'slow');
            setTimeout(() => {
                $("#menu1").hide() .toggleClass("slidedown");
            },600);
        } else {
            $("#menu1").show().toggleClass("slidedown").animate({ top: '50px' }, 'slow');
            setTimeout(() => {
                $("#menu1").toggleClass("slidedown");
            },600);
        }
    });
    $("#menu1").on('click', function () {
        $("#menu1").toggleClass("slideup").animate({ top: '1' }, 'slow');
        setTimeout(() => {
            const primario = $("#primario1").attr('src');
            const secundario = $("#secundario1").attr('src');
            const classprimario = $("#primario1").attr('class');
            const classsecundario = $("#secundario1").attr('class');
            $("#primario1").attr("src", secundario);
            $("#secundario1").attr("src", primario);
            $("#primario1").attr("class", classsecundario);
            $("#secundario1").attr("class", classprimario);
            $("#menu1").hide().toggleClass("slideup");
        }, 600);
    });
    $("#show").change(function () {
        console.log('show');
        if ( $("#pass").attr('type') != 'text') {
            $("#pass").attr('type', 'text')  
        } else {
            $("#pass").attr('type', 'password')  
        }
    });
    $("#olvidar").on('click', function () {
        console.log('olvidar');
    });
    $("#ayuda").on('click', function () {
        console.log('ayuda');
    });
    $("#ayuda1").on('click', function () {
        console.log('ayuda');
    });
    $("#boton").on('click', function () {
        console.log('boton');
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
