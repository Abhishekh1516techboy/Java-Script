document.addEventListener("DOMContentLoaded", () => {
  // Category select styling
  const select = document.querySelector('select[name="category"]');
  select.addEventListener("change", () => {
    if (select.value) {
      select.classList.add("has-value");
    } else {
      select.classList.remove("has-value");
    }
  });

  // Description character count
  document
    .querySelector('textarea[name="description"]')
    .addEventListener("input", function () {
      const count = this.value.length;
      const charCount = document.getElementById("charCount");
      charCount.textContent = count;
      charCount.classList.toggle("text-red-500", count > 450);
    });

  // Product update form submission
  const productUpdateForm = document.getElementById("updateProduct");
  productUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading spinner
    const submitBtn = productUpdateForm.querySelector(".submit-btn");
    const submitText = productUpdateForm.querySelector(".submit-text");
    const submitSpinner = productUpdateForm.querySelector(".submit-spinner");
    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    submitSpinner.classList.remove("hidden");

    // Create FormData
    const formData = new FormData();

    const productData = {
      productName: document.getElementById("productName").value,
      brandName: document.getElementById("brandName").value,
      category: document.getElementById("category").value,
      model: document.getElementById("model").value,
      price: parseFloat(document.getElementById("price").value),
      discount: parseInt(document.getElementById("discount").value) || 0,
      stock: parseInt(document.getElementById("stock").value),
      bgColor: document.getElementById("bgColor").value,
      panelColor: document.getElementById("panelColor").value,
      description: document.getElementById("description").value,
    };

    // Append textual data as a JSON string
    formData.append("data", JSON.stringify(productData));

    // Append image if selected
    const fileInput = document.getElementById("productImage");
    if (fileInput.files[0]) {
      formData.append("productImage", fileInput.files[0]);
    }

    try {
      const response = await fetch(`/owners/updateProduct/${productId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "/owners/profile?productUpdate=true";
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        alert(data.message || "Failed to update product");
        submitBtn.disabled = false;
        submitText.classList.remove("hidden");
        submitSpinner.classList.add("hidden");
      }
    } catch (error) {
      console.error(error);
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      submitSpinner.classList.add("hidden");
      window.location.reload();
    }
  });
});

function previewImage(event) {
  const input = event.target;
  const file = input.files[0];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!file) return;
  if (!validTypes.includes(file.type)) {
    alert("Please upload a valid image (JPEG, PNG, or GIF).");
    input.value = "";
    return;
  }
  if (file.size > maxSize) {
    alert("Image size exceeds 5MB limit.");
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("imgPreview");
    output.src = reader.result;
    output.classList.remove("hidden");
    document.getElementById("uploadText").classList.add("hidden");
    document.getElementById("changeImageBtn").classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function handleDragOver(e) {
  e.preventDefault();
  document
    .getElementById("uploadContainer")
    .classList.add("border-blue-500", "bg-blue-50");
}

function handleDragLeave(e) {
  e.preventDefault();
  document
    .getElementById("uploadContainer")
    .classList.remove("border-blue-500", "bg-blue-50");
}

function handleDrop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  const input = document.getElementById("productImage");
  if (files.length > 0) {
    input.files = files;
    previewImage({ target: input });
  }
  document
    .getElementById("uploadContainer")
    .classList.remove("border-blue-500", "bg-blue-50");
}

function resetImageInput() {
  const input = document.getElementById("productImage");
  input.value = "";
  document.getElementById("imgPreview").classList.add("hidden");
  document.getElementById("uploadText").classList.remove("hidden");
  document.getElementById("changeImageBtn").classList.add("hidden");
}
