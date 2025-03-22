const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseInt(document.querySelector('#height').value);
    const weight = parseInt(document.querySelector('#weight').value);
    const result = document.querySelector('#results');

    if (height === '' || height < 0 || isNaN(height)) {
        result.innerHTML = `Please give a valid Height ${height}`;
        setTimeout(() => {
            result.innerHTML = " ";
        }, 3000)

    } else if (weight === '' || weight < 0 || isNaN(weight)) {
        result.innerHTML = `Please give a valid Weight ${weight}` ;
        setTimeout(() => {
            result.innerHTML = " ";
        }, 3000)
    }else{
       const BMI = (weight / ((height*height)/10000)).toFixed(2);
    //    show the result...
    result.innerHTML = `<span>BMI = ${BMI}</span>`;
    }
});