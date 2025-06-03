document.addEventListener("DOMContentLoaded", () => {
  // Settings Form Submission
  const profileUpdate = document.getElementById("settingsForm");

  profileUpdate.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      aadharNumber: document.getElementById("aadharNumber").value,
      age: document.getElementById("age").value,
      address: {
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        pinCode: document.getElementById("pinCode").value,
      },
    };

    try {
      const response = await fetch(`/users/profile/${userId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          window.location.href = `/users/profile/${userId}?profileUpdate=true`;
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating the profile");
    }
  });
});
