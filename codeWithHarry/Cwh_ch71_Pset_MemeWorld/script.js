let hamburgur = document.querySelector('.menu-icon');
let cancelBtn = document.querySelector('.cancel');
let hamSlider = document.querySelector('.ham-slider');

hamburgur.addEventListener('click', () => {
    hamSlider.style.transform = 'translateX(0)';
});

cancelBtn.addEventListener('click', () => {
    hamSlider.style.transform = 'translateX(100%)';
});

// meme's API....
const url = 'https://programming-memes-images.p.rapidapi.com/v1/memes';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '56898e381emsh9c6972d7fa0dabfp1b24c0jsnccf080bcc9ce',
        'x-rapidapi-host': 'programming-memes-images.p.rapidapi.com'
    }
};

const fetchWeather = async () => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result);
        let clutter = "";
        for (const key in result) {
            clutter += `
                 <div class="fancy-card">
                    <img src="${result[key].image}" alt="Card Image">
                    <div class="card-content">
                        <h3 class="card-title">Programming Meme's</h3>
                        <p class="card-description">This is a fancy card with an image overlay, gradient background, and
                            hover effects.</p>
                        <button class="card-button">Learn More</button>
                    </div>
                </div>
            `;

        }

        document.getElementById("card-container").innerHTML = clutter;
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchWeather();
