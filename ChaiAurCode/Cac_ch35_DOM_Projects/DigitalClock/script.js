const clock = document.querySelector('#clock');

const localTime = () => {
    let time = new Date();
    clock.textContent = time.toLocaleTimeString();
};

setInterval(localTime, 1000)


