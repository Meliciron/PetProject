let background = document.querySelector(".intro")

window.addEventListener("scroll", (e) => {
    if (pageYOffset < 1000) {
        background.style.top = `${pageYOffset}px`
    }
})