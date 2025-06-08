document.querySelectorAll(".remove-cart-btn").forEach((button) => {
  button.addEventListener("click", async function (e) {
    e.preventDefault();
    const cartId = this.getAttribute("data-cart-id");

    // Show confirmation modal (uncommented for better UX)
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/carts/remove/${cartId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error(data.message || "Failed to remove product from cart");
      }
    } catch (error) {
      alert(error.message || "An error occurred while removing the product");
      console.error("Delete error:", error);
    }
  });
});
