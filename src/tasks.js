const throttle = (func, ms) => {
    let isNotTimer = true;
    return (...args) => {
        if (isNotTimer) {
            func(...args);
            isNotTimer = false;
            setTimeout(() => {
                isNotTimer = true;
            }, ms);
        }
    };
};

const maxCallbacks = (func, maxCount) => {
    let counter = 0;
    return (...args) => {
        if (counter < maxCount) {
            func(...args);
            counter += 1;
        }
    } 
}

const sayCoords = (event) => {
    console.log([event.clientX, event.clientY]);
};

const bounceSayCoords = throttle(maxCallbacks(sayCoords, 5), 1000);

document.addEventListener('mousemove', bounceSayCoords);


