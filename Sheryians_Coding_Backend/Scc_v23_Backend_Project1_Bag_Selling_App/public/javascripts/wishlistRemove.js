async function removeFromWishlist(button) {
  const productId = button.getAttribute("data-product-id");

  // Show confirmation modal (uncommented for better UX)
  const confirmDelete = confirm("Are you sure you want to Remove this item?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/wishlists/remove/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      throw new Error(
        data.message || "Failed to remove product from wishlists"
      );
    }
  } catch (error) {
    alert(error.message || "An error occurred while removing the wishlists");
    console.error("wishlists delet error:", error);
  }
}
