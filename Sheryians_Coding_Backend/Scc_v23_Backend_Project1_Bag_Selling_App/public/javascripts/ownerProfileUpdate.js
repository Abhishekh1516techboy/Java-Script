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

    // Create FormData object
    const formData = new FormData();

    const allData = {
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

    // Append textual data as a JSON string
    formData.append("data", JSON.stringify(allData));

    // Append file (if selected)
    const fileInput = document.getElementById("picture");
    if (fileInput.files[0]) {
      formData.append("picture", fileInput.files[0]); // append file data
    }

    try {
      const response = await fetch("/owners/profile/update", {
        method: "PUT",
        body: formData,
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
