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
    } else {
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
});
