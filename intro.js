let intro = document.querySelector(".intro")
let sky = document.createElement("div");
let startGradient = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
let finishGradient = [[255, 251, 232], [255, 251, 232], [255, 244, 220], [249, 210, 155], [243, 192, 128], [218, 46, 79], [218, 46, 79]];
let steps = JSON.parse(JSON.stringify(startGradient));
let iterations = 20;
let animDuration = 2000;
let currentGradient = JSON.parse(JSON.stringify(startGradient));

document.addEventListener("DOMContentLoaded", () => {
    sky.classList.add("intro__sky");
    intro.appendChild(sky);
    changeGradient(sky);
});

async function changeGradient(element) {
    element.style.opacity = 1;
    for (let i = 0; i < startGradient.length; i++) {
        for (let j = 0; j < 3; j++) {
            steps[i][j] = Math.round((finishGradient[i][j] - startGradient[i][j]) / iterations);
        }
    }
    for (let c = 0; c < iterations; c++) {
        for (let i = 0; i < startGradient.length; i++) {
            for (let j = 0; j < 3; j++) {
                currentGradient[i][j] += steps[i][j];
            }
        }
        let promise = new Promise(resolve => {
            setTimeout(() => {
                resolve(element.style.background = `radial-gradient(circle at bottom, rgb(${currentGradient[0][0]},${currentGradient[0][1]},${currentGradient[0][2]}) 10%, rgb(${currentGradient[1][0]},${currentGradient[1][1]},${currentGradient[1][2]}) 16%, rgb(${currentGradient[2][0]},${currentGradient[2][1]},${currentGradient[2][2]}) 29%, rgb(${currentGradient[3][0]},${currentGradient[3][1]},${currentGradient[3][2]},1) 36%, rgb(${currentGradient[4][0]},${currentGradient[4][1]},${currentGradient[4][2]}) 42%, rgb(${currentGradient[5][0]},${currentGradient[5][1]},${currentGradient[5][2]}) 80%, rgb(${currentGradient[6][0]},${currentGradient[6][1]},${currentGradient[6][2]}) 100%)`)
            }, 110);
        })
        await promise;
    }
}