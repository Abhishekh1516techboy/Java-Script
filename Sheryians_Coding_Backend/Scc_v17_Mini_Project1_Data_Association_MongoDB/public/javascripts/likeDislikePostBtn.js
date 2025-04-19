// -----------------Post Like btn handler-----------------
window.handleLike = async (event, postId) => {
  event.preventDefault(); // Prevent default form submission

  const likeCountElements = document.querySelectorAll(`#like-count-${postId}`);
  const dislikeCountElements = document.querySelectorAll(
    `#dislike-count-${postId}`
  );

  if (likeCountElements.length === 0 || dislikeCountElements.length === 0) {
    console.error(`Count elements not found for post ${postId}`);
    return;
  }

  try {
    const response = await fetch(`/post/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies (e.g., token) in the request
    });

    if (response.ok) {
      const data = await response.json();
      // Update all like count elements
      likeCountElements.forEach(
        (element) => (element.textContent = data.likes || 0)
      );
      // Update all dislike count elements
      dislikeCountElements.forEach(
        (element) => (element.textContent = data.dislikes || 0)
      );
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      console.error("Failed to update like:", errorData.error);
      alert("Failed to update like: " + errorData.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};

// ---------------Post DisLike btn handler-----------------
window.handleDislike = async (event, postId) => {
  event.preventDefault(); // Prevent default form submission

  const likeCountElements = document.querySelectorAll(`#like-count-${postId}`);
  const dislikeCountElements = document.querySelectorAll(
    `#dislike-count-${postId}`
  );

  if (likeCountElements.length === 0 || dislikeCountElements.length === 0) {
    console.error(`Count elements not found for post ${postId}`);
    return;
  }

  try {
    const response = await fetch(`/post/${postId}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Update all like count elements
      likeCountElements.forEach(
        (element) => (element.textContent = data.likes || 0)
      );
      // Update all dislike count elements
      dislikeCountElements.forEach(
        (element) => (element.textContent = data.dislikes || 0)
      );
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      console.error("Failed to update dislike:", errorData.error);
      alert("Failed to update dislike: " + errorData.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the dislike.");
  }
};
