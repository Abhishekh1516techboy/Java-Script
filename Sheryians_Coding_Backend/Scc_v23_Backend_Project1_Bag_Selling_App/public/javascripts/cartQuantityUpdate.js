// Handle quantity updates
function setupQuantityButtons() {
  // Increase quantity
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", updateQuantity);
  });

  // Decrease quantity
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", updateQuantity);
  });
}

async function updateQuantity(e) {
  const button = e.currentTarget;
  const itemId = button.dataset.itemId;
  const isIncrease = button.classList.contains("increase-quantity");
  const quantityElement = button.parentElement.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);

  if (isIncrease) {
    quantity++;
  } else {
    if (quantity <= 1) return; 
    quantity--;
  }

  try {
    const response = await fetch(`/carts/quantity/update/${itemId}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: quantity }),
    });

    if (response.ok) {
      quantityElement.textContent = quantity;
      // Reload the cart page to reflect updated cart
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      const error = await response.json();
      alert(error.message || "Failed to update quantity");
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    alert("Network error. Please try again.");
  }
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".increase-quantity")) setupQuantityButtons();
  if (document.querySelector(".remove-form")) setupRemoveForms();
});
