document.addEventListener("DOMContentLoaded", () => {
  // Profile Image Upload
  const profileImage = document.getElementById("profileImage");
  const imageUpload = document.getElementById("imageUpload");
  imageUpload.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        profileImage.src = event.target.result;
        const formData = new FormData();
        formData.append("picture", file);
        try {
          const response = await fetch(`/users/profile/${userId}/imageUpdate`, {
            method: "PUT",
            body: formData,
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
            alert(data.message || "Failed to update Image");
          }
        } catch (error) {
          alert("An error occurred while uploading the image");
        }
      };
      reader.readAsDataURL(file);
    }
  });
});
