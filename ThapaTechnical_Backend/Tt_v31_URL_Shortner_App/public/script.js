const fetchShortedURL = async () => {
  try {
    const response = await fetch("/links");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const links = await response.json();

    const list = document.getElementById("shortenedURLs");
    list.innerHTML = "";

    for (const [shortUrl, url] of Object.entries(links)) {
      const li = document.createElement("li");
      li.className = "links-list";

      const truncatedURL = `${url.length >= 30}` ? `${url.slice(0, 50)}...` : "";

      li.innerHTML = `<a href="/${shortUrl}" target="_blank">
          ${window.location.origin}/${shortUrl}
        </a> ${truncatedURL}`;
      list.appendChild(li);
    }
  } catch (error) {
    console.error("Error fetching or rendering URLs:", error);
    const list = document.getElementById("shortenedURLs");
    if (list) {
      list.innerHTML = "<li>Error loading URLs. Please try again later.</li>";
    }
  }
};

document.getElementById("shortenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(event.target);
  const url = formData.get("fullUrl");
  const shortUrl = formData.get("shortUrl");

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ url, shortUrl }),
    });

    if (response.ok) {
      alert("Form submitted Successfully!");
      e.target.reset();
      fetchShortedURL();
    } else {
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
});

fetchShortedURL();
