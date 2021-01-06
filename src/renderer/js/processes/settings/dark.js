let dark_mode = localStorage.getItem("dark-mode-second-window");


document.onkeypress = function (e) {
    let is_dark_mode = localStorage.getItem("dark-mode-second-window");

    e = e || window.event;
    
    if (e.keyCode == 4) {
        toggle_dark_mode ();
    }

}

set_default_dark_mode()
/**
 * Called everytime the theme will change. This inverts the colors and then finally saves the new dark mode value using save_theme_settings
 */
function toggle_dark_mode () {
    let is_dark_mode = localStorage.getItem("dark-mode-second-window");

    if (typeof is_dark_mode != "string" || is_dark_mode == undefined || is_dark_mode == "false"){
        is_dark_mode = "true";
    } else {
        is_dark_mode = "false";
    }

    // change dark-theme to new values

     document.documentElement.classList.toggle("dark-mode-second-window");
 
     document.querySelectorAll(".inverted").forEach(q => {
         q.classList.toggle("invert");
     });
 
     document.querySelectorAll(".sub-text-minimal").forEach(q => {
            
         q.classList.toggle("invert-text-dark")
     })


    save_theme_settings(is_dark_mode);

    // save new dark-mode settings
}

/**
 * Sets the new value of dark-mode in localStorage
 * @param {*} current_value Either the toString() of True and False
 */
function save_theme_settings (current_value) {
    localStorage.setItem("dark-mode-second-window", current_value);
    dark_mode = current_value;
}

function set_default_dark_mode () {
    let is_dark_mode = localStorage.getItem("dark-mode-second-window"); 
    if (typeof is_dark_mode != "string" || is_dark_mode == undefined){
        is_dark_mode = "true";
        localStorage.setItem("dark-mode-second-window", "true");
        console.log("failed the dark-mode check")
    }

    // change dark-theme to new values

    if (is_dark_mode == "false") {
        document.documentElement.classList.toggle("dark-mode-second-window");
 
        document.querySelectorAll(".inverted").forEach(q => {
            q.classList.toggle("invert");
        });
    
        document.querySelectorAll(".sub-text-minimal").forEach(q => {
               
            q.classList.toggle("invert-text-dark")
        })
    }
}