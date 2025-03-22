// Function to fetch data from the API
function fetchData (url) {
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            githubData(data); // Call function to handle the data
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Fetch data using default URL
fetchData("https://api.github.com/users/hiteshchoudhary");

// Add event listener to the form
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('user-input').value.trim(); // Get and trim user input
    const url = `https://api.github.com/users/${inputValue}`;
    fetchData(url); // Call fetchData with the user-provided URL

});

// Function to update the UI with GitHub data
function githubData (data) {
    document.getElementById('user-avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || 'N/A';
    document.getElementById('user-name').textContent = data.login || 'N/A';
    document.getElementById('user-Id').textContent = data.id || 'N/A';
    document.getElementById('followers').textContent = data.followers || 'N/A';
    document.getElementById('following').textContent = data.following || 'N/A';
    document.getElementById('public-repos').textContent = data.public_repos || 'N/A';
    document.getElementById('blog').textContent = data.blog || 'N/A';
    document.getElementById('github-page').href = data.html_url || '#';
}
