document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector('select[name="category"]');
  select.addEventListener("change", () => {
    if (select.value) {
      select.classList.add("has-value");
    } else {
      select.classList.remove("has-value");
    }
  });

  document
    .querySelector('textarea[name="description"]')
    .addEventListener("input", function () {
      const count = this.value.length;
      const charCount = document.getElementById("charCount");
      charCount.textContent = count;
      charCount.classList.toggle("text-red-500", count > 450);
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

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".submit-btn");
  btn.disabled = true;
  btn.querySelector(".submit-text").classList.add("hidden");
  btn.querySelector(".submit-spinner").classList.remove("hidden");
  setTimeout(() => {
    e.target.submit();
  }, 1000);
}

function resetImageInput() {
  const input = document.getElementById("productImage");
  input.value = "";
  document.getElementById("imgPreview").classList.add("hidden");
  document.getElementById("uploadText").classList.remove("hidden");
  document.getElementById("changeImageBtn").classList.add("hidden");
}
