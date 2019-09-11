let blurElements = document.querySelectorAll('.blur-when-open')

function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
    toggleBlur()
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
    toggleBlur(false)
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
    toggleBlur()
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
    toggleBlur(false)
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
    toggleBlur()
}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
    toggleBlur(false)
}

function setsize (canvas, gl) {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    gl.setUniform("u_resolution",canvas.width,canvas.height);
}

function toggleBlur(toggle = true)
{
    for(let blurElement of blurElements)
    {
        if (toggle) {
            blurElement.classList.add('blur-active')
        } else {
            blurElement.classList.remove('blur-active')
        }
    }
}

fetch('shaders/sin2.frag')
.then((res) => {
    return res.text();
})
.then((shader) => {
    let canvas = document.getElementById('webGlCanvas')
    let gl = new GlslCanvas(canvas);

    setsize(canvas, gl)

    window.addEventListener("resize", e => {
        setsize(canvas, gl)
    });

    window.addEventListener('mousemove', e => {
        gl.setMouse({x: 0, y: 0})
    });

    gl.load(shader);
});

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
},1500);
