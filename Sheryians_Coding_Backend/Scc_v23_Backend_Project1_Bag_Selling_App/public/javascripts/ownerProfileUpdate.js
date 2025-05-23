document.addEventListener("DOMContentLoaded", () => {
  // Profile-Update Modal Handling
  const updateProfileBtn = document.getElementById("updateProfileBtn");
  const ProfileUpdateModal = document.getElementById("ProfileUpdateModal");
  const editProfileCloseBtn = document.getElementById("editProfileCloseBtn");
  const editProfileCancelBtn = document.getElementById("editProfileCancelBtn");
  const profileUpdateForm = document.getElementById("ProfileUpdateForm");

  updateProfileBtn.addEventListener("click", () => {
    ProfileUpdateModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  const hideUpdateModal = () => {
    ProfileUpdateModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    profileUpdateForm.reset();
    passwordError.classList.add("hidden");
  };

  editProfileCancelBtn.addEventListener("click", hideUpdateModal);
  editProfileCloseBtn.addEventListener("click", hideUpdateModal);

  // Settings Form Submission

  profileUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      // Personal Info
      name: document.getElementById("name").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,

      // Address Info
      address: {
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        pinCode: document.getElementById("pinCode").value,
      },

      // Business Info
      gstIn: document.getElementById("gstin").value,
      aadharNumber: document.getElementById("aadharNumber").value,

      // Bank Details
      bankDetails: {
        bankName: document.getElementById("bankName").value,
        accountNumber: document.getElementById("accountNumber").value,
        ifscCode: document.getElementById("ifscCode").value,
      },
    };

    try {
      const response = await fetch("/owners/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        hideUpdateModal();
        setTimeout(() => {
          window.location.href = "/owners/profile?profileUpdate=true";
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating the profile");
      console.error(error);
    }
  });
});
