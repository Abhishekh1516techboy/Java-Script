// Password Modal Handling
const passwordModal = document.getElementById("changePasswordModal");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const closePasswordModal = document.getElementById("closePasswordModal");
const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const passwordForm = document.getElementById("passwordForm");
const passwordError = document.getElementById("passwordError");


changePasswordBtn.addEventListener("click", () => {
  passwordModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

const hidePasswordModal = () => {
  passwordModal.classList.add("hidden");
  document.body.style.overflow = "auto";
  passwordForm.reset();
  passwordError.classList.add("hidden");
};

closePasswordModal.addEventListener("click", hidePasswordModal);
cancelPasswordBtn.addEventListener("click", hidePasswordModal);

savePasswordBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    passwordError.textContent = "New password and confirmation do not match";
    passwordError.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch("/owners/profile/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (response.ok) {
      setTimeout(() => {
        window.location.href = `/owners/profile/?passwordChanged=true`;
      }, 1000);
      hidePasswordModal();
    } else {
      passwordError.textContent = data.message || "Failed to change password";
      passwordError.classList.remove("hidden");
    }
  } catch (error) {
    passwordError.textContent = "An error occurred. Please try again.";
    passwordError.classList.remove("hidden");
  }
});
