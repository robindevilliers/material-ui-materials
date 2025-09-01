import $ from "jquery";


function createButtonRipple(event) {

    const target = event.currentTarget;
    const ripple = target.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    const circle = document.createElement("div");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    const boundingRect = target.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - boundingRect.x - radius}px`;
    circle.style.top = `${event.clientY - boundingRect.y - radius}px`;
    circle.classList.add("ripple");

    target.appendChild(circle);
}

function createHaloRipple(event) {

    const target = event.currentTarget;
    const halo = target.parentElement.getElementsByClassName("halo")[0];

    if (halo) {
        halo.remove();
    }

    const circle = document.createElement("div");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    const boundingRect = target.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${target.x + radius}px`;
    circle.style.top = `${target.y + radius}px`;
    circle.classList.add("halo");

    target.parentElement.appendChild(circle);
}

$(function () {
    for (const button of document.getElementsByTagName("button")) {
        button.addEventListener("click", createButtonRipple);
    }

    for (const radio of $("input[type='checkbox']")) {
        radio.addEventListener("click", createHaloRipple);
    }

    for (const radio of $("input[type='radio']")) {
        radio.addEventListener("click", createHaloRipple);
    }
});