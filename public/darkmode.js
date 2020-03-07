function main() {
    const darkModeConfig = global.localStorage.getItem("darkmode");
    let isDarkMode;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        isDarkMode = true;
    } else {
        isDarkMode = darkModeConfig === "true";
    }
    darkmode(isDarkMode);
    const darkmodeCheckBox = document.getElementById('darkmode');
    darkmodeCheckBox.checked = isDarkMode;
    darkmodeCheckBox.onclick = () => darkmode(darkmodeCheckBox.checked);
    
}

function darkmode(isDarkMode) {
    global.localStorage.setItem("darkmode", isDarkMode);
    const body = document.getElementsByTagName('body')[0]
    body.style.backgroundColor = isDarkMode ? 'black' : 'white';
    body.style.color = isDarkMode ? 'white' : 'black';

}


window.onload = main();