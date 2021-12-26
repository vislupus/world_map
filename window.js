window.addEventListener('resize', resize)
resize();

function resize() {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    let newSize = (screenHeight * 1.77777).toFixed(0);

    if (newSize > screenWidth) {
        document.getElementById('wrap').style.width = screenWidth - 15 + "px";
    } else {
        document.getElementById('wrap').style.width = newSize - 10 + "px";
    }
}
