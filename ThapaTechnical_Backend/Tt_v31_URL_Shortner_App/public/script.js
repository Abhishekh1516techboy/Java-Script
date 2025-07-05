document.getElementById("shortenForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(event.target);
  const url = formData.get("fullUrl");
  const shortUrl = formData.get("shortUrl");
  
});
