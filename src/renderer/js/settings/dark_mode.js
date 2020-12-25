

document.onkeypress = function (e) {
    let is_dark_mode = localStorage.getItem("dark-mode");

    e = e || window.event;

    console.log(e.keyCode)
    if (e.keyCode == 4) {
        document.getElementById("dark-mode").toggleAttribute("checked")
        change_dark_theme(is_dark_mode)
    }

}

function change_dark_theme (is_dark_mode) {

    if (is_dark_mode == 'true') {
       localStorage.setItem("dark-mode", "false");
    } else {
        localStorage.setItem("dark-mode", "true");
    }

    document.documentElement.classList.toggle("dark-mode");

    document.querySelectorAll(".inverted").forEach(q => {
        q.classList.toggle("invert");
    });

    document.querySelectorAll(".sub-text-minimal").forEach(q => {
           
        q.classList.toggle("invert-text-dark")
    })


}

function change_dark_theme_setting () {
    let is_dark_mode = localStorage.getItem("dark-mode");
    document.getElementById("dark-mode").toggleAttribute("checked")
    change_dark_theme (is_dark_mode);
}

function set_default_dark_mode () {
    let is_dark_mode = localStorage.getItem("dark-mode");

    if (is_dark_mode == "true"){
        document.getElementById("dark-mode").toggleAttribute("checked")
    } else {
        change_dark_theme(is_dark_mode)
    }

}

set_default_dark_mode()