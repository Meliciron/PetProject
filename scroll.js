let background = document.querySelector(".intro")

window.addEventListener("scroll", (e) => {
    if (pageYOffset < 500) {
        background.style.top = `${pageYOffset}px`
    }
})