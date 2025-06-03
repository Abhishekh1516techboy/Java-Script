let currentProductId;

document.querySelectorAll(".delete-product-btn").forEach((button) => {
  button.addEventListener("click", function () {
    currentProductId = this.getAttribute("data-product-id");
    const productName = this.getAttribute("data-product-name");
    const deleteModal = document.getElementById("deleteProductModal");
    const productNameSpan = document.getElementById("deleteProductName");
    productNameSpan.textContent = productName;
    deleteModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `/owners/deleteProduct/${currentProductId}`,
        {
          method: "DELETE",
        }
      );
      await response.json();

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "/owners/profile?productDelete=true";
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      alert("An error occurred while deleting the product");
      console.error(error);
    } finally {
      document.getElementById("deleteProductModal").classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });

document
  .getElementById("closeDeleteModal")
  .addEventListener("click", function () {
    document.getElementById("deleteProductModal").classList.add("hidden");
    document.body.style.overflow = "auto";
  });

document
  .getElementById("cancelDeleteBtn")
  .addEventListener("click", function () {
    document.getElementById("deleteProductModal").classList.add("hidden");
    document.body.style.overflow = "auto";
  });
