let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let addWeatherBtn = document.querySelector(".weather-card__plus-wrapper");
let emptyCard = document.querySelector(".weather-card.empty");
let emptyCardError = document.querySelector(".weather-card__error-message-wrpapper");
let weatherCard = document.querySelector(".weather-card");
let cardsList = document.querySelectorAll(".weather-card");
let cityInput = document.querySelector(".weather-card__input");
let weatherTrack = document.querySelector(".section__content-forecast");
let searchBtn = document.querySelector(".weather-card__serach-btn");
let removeCardBtns;
let weatherStorage;

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.length > 0){
        loadFromLocalStorage()
    }
});

//getWeather("Saint Petersburg", weatherCard);
weatherCard.remove();

addWeatherBtn.addEventListener("click", () => {
    emptyCard.classList.add("active");
});

function addListenersOnRemoveButtons() {
    if (removeCardBtns != "undefined") {
        removeCardBtns.forEach(item => {
            item.addEventListener("click", () => {
                item.parentElement.classList.add("leaving");
                setTimeout(() => {
                    deleteFromLocalStorage(item.dataset.city);
                    item.parentElement.remove();
                    saveToLocalStorage();
                }, 800);
            });
        });
    };
};

searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=2234bdedc95745aa825aa6e9d0905892`)
        .then(data => {
            if (data.ok) {
                emptyCardAnimation()
                data.json().then(cachData => {
                    setTimeout(() => {
                        addWeatherCard(cachData);
                    }, 600);
                });
                cityInput.value = "";
            }
            else {
                emptyCardError.classList.add("visible");
                earthClick();
                cityInput.addEventListener("input", () => {
                    emptyCardError.classList.remove("visible");
                });
            };
        });
})

cityInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.which === 13) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=2234bdedc95745aa825aa6e9d0905892`)
            .then(data => {
                if (data.ok) {
                    emptyCardAnimation()
                    data.json().then(cachData => {
                        setTimeout(() => {
                            addWeatherCard(cachData);
                        }, 600);
                    });
                    cityInput.value = "";
                }
                else {
                    emptyCardError.classList.add("visible");
                    earthClick();
                    cityInput.addEventListener("input", () => {
                        emptyCardError.classList.remove("visible");
                    });
                };
            });
    }
    else if (e.which === 27) {
        emptyCard.classList.remove("active");
    }
});


function emptyCardAnimation() {
    emptyCard.classList.remove("invalid");
    emptyCard.classList.remove("active");
    emptyCard.classList.add("leaving");
};

function addWeatherCard(cachData) {
    let newCard = document.createElement("div");
    newCard.classList.add("weather-card");
    newCard.innerHTML = weatherCard.innerHTML;
    weatherTrack.appendChild(newCard);
    weatherTrack.appendChild(emptyCard);
    removeCardBtns = document.querySelectorAll(".weather-card__remove-card");
    addListenersOnRemoveButtons();
    emptyCard.classList.remove("leaving");
    emptyCard.classList.add("arriving");
    newCard.classList.add("arriving");
    setTimeout(() => {
        newCard.classList.remove("arriving");
    }, 50);
    setTimeout(() => {
        emptyCard.classList.remove("arriving");
    }, 350);
    getWeather(null, newCard, cachData);
    saveToLocalStorage();
};

function getWeather(city, card, cachData) {
    if (city != null) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2234bdedc95745aa825aa6e9d0905892`)
            .then(response => { return response.json() })
            .then(data => { fillHtml(card, data) });
    }
    else
        fillHtml(card, cachData);
}

function fillHtml(card, data) {
    let date = new Date();
    card.querySelector(".weather-card__current-city").innerText = data.name;
    card.setAttribute("data-city", `${data.name}`);
    card.querySelector(".weather-card__current-date").innerText = `${date.getDate()}.${date.getMonth() + 1} ${days[date.getDay()]}`
    card.querySelector(".weather-card__current-temperature").innerHTML = `${Math.round(data.main.temp)}&deg`
    card.querySelector(".weather-icon__description").innerText = data.weather[0].description;
    card.querySelector(".weather-card__icon-image").setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    card.querySelector(".middle-subsection__feels-like-span").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg`;
    card.querySelector(".middle-subsection__max-temp-span").innerHTML = `Max temperature: ${Math.round(data.main.temp_max)}&deg`;
    card.querySelector(".middle-subsection__min-temp-span").innerHTML = `Min temperature: ${Math.round(data.main.temp_min)}&deg`;
    card.querySelector(".bot-subsection__pressure-span").innerText = `Pressure: ${Math.round(data.main.pressure * 0.750064)} mm Hg`;
    card.querySelector(".bot-subsection__wind-speed-span").innerText = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    card.querySelector(".bot-subsection__wind-direction-span").innerText = `Wind direction: ${windConvert(Math.round(data.wind.deg))}`;
}

function earthClick() {
    let earthClickerCount = 0;
    let earth = document.querySelector(".earth");
    earth.addEventListener("click", () => {
        earthClickerCount++;
        if (earthClickerCount >= 7) {
            earthClickerCount = 0;
            earth.classList.add("rotate");
            setTimeout(() => {
                earth.classList.remove("rotate");
            }, 300);
        };
    });
};

function windConvert(degree) {
    if (degree > 337.5) return 'North';
    if (degree > 292.5) return 'North-West';
    if (degree > 247.5) return 'West';
    if (degree > 202.5) return 'South-West';
    if (degree > 157.5) return 'South';
    if (degree > 122.5) return 'South-East';
    if (degree > 67.5) return 'East';
    if (degree > 22.5) return 'North-East';
    return 'North';
};

function saveToLocalStorage() {
    let citiesToSave = document.querySelectorAll("[data-city]");
    citiesToSave = Array.from(citiesToSave).map(item => item.dataset.city);
    localStorage.setItem("citiesToSave", JSON.stringify(citiesToSave));
};

function deleteFromLocalStorage(city) {
    localStorage.removeItem(city);
};

function loadFromLocalStorage() {
    if (JSON.parse(localStorage.getItem("citiesToSave")).length > 0) {
        Array.from(JSON.parse(localStorage.getItem("citiesToSave"))).forEach(city => {
            let newCard = document.createElement("div");
            newCard.classList.add("weather-card");
            newCard.innerHTML = weatherCard.innerHTML;
            weatherTrack.appendChild(newCard);
            weatherTrack.appendChild(emptyCard);
            getWeather(city, newCard);
        });
    }
    removeCardBtns = document.querySelectorAll(".weather-card__remove-card");
    addListenersOnRemoveButtons();
};