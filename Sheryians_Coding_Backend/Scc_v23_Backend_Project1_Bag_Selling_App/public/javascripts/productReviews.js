async function submitReview(e) {
  e.preventDefault();

  const rating = parseInt(document.getElementById("rating").value);
  const reviewText = document.getElementById("reviewText").value.trim();
  const reviewSuccess = document.getElementById("reviewSuccess");
  const reviewError = document.getElementById("reviewError");

  reviewSuccess.classList.add("hidden");
  reviewError.classList.add("hidden");

  if (!rating || !reviewText) {
    reviewError.textContent = "Please fill in all fields.";
    reviewError.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(`/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, reviewText }),
    });

    const data = await res.json();

    if (res.ok) {
      reviewSuccess.classList.remove("hidden");
      document.getElementById("reviewForm").reset();
      setTimeout(() => window.location.reload(), 1200);
    } else {
      reviewError.textContent = data.message || "Failed to submit review.";
      reviewError.classList.remove("hidden");
    }
  } catch (err) {
    reviewError.textContent = "Server error. Please try again.";
    reviewError.classList.remove("hidden");
  }
}
