let closeButton = document.querySelector(".modal__close");
let modalWindow = document.querySelector(".modal");
let popupList = document.getElementById("popup");

closeButton.addEventListener("click", () => {
    modalWindow.classList.remove("active");
});

/*document.addEventListener("click", (e)=> {
    if ((e.target != "modal__content") && (e.target != popupList)) {
        console.log(e.target);
        modalWindow.classList.remove("active");
    };
});*/

document.addEventListener("keydown", (e) => {
    if (e.which === 27){
        modalWindow.classList.remove("active");
    }
})