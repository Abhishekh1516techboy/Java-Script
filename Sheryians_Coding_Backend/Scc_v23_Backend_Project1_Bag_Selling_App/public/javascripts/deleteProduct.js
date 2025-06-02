// Delete product modal handling
document.querySelectorAll(".delete-product-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.getAttribute("data-product-id");
    const productName = this.getAttribute("data-product-name");
    const deleteModal = document.getElementById("deleteProductModal");
    const deleteForm = document.getElementById("deleteProductForm");
    const productNameSpan = document.getElementById("deleteProductName");
    // Set form action and product name
    deleteForm.action = `/owners/deleteProduct/${productId}`;
    productNameSpan.textContent = productName;
    // Show modal
    deleteModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});
// Close delete modal
document
  .getElementById("closeDeleteModal")
  .addEventListener("click", function () {
    document.getElementById("deleteProductModal").classList.add("hidden");
    document.body.style.overflow = "auto";
  });
// Cancel delete
document
  .getElementById("cancelDeleteBtn")
  .addEventListener("click", function () {
    document.getElementById("deleteProductModal").classList.add("hidden");
    document.body.style.overflow = "auto";
  });
