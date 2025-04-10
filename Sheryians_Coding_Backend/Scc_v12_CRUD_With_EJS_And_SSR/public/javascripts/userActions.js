// Delete user from AllUsers List Routes
const deleteUser = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`/user/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
        } else if (res.ok) {
          window.location.reload();
        } else {
          return res.json().then((data) => {
            alert(data.error || "Failed to delete user");
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert("An error occurred while deleting the user.");
      });
  }
};

// User Update routes
const updateUser = (id) => {
  const form = document.getElementById("editUserForm");
  const userId = id;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      imageUrl: document.getElementById("imageUrl").value,
    };

    try {
      const res = await fetch(`/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const msg = document.getElementById("statusMsg");

      if (res.status === 400) {
        const data = await res.json();
        msg.textContent = data.error || "No changes detected.";
        msg.className = "text-yellow-500 font-medium";
      } else if (res.ok) {
        msg.textContent = "User updated successfully!";
        msg.className = "text-green-600 font-medium";
      } else {
        msg.textContent = "Failed to update user.";
        msg.className = "text-red-600 font-medium";
      }
    } catch (err) {
      console.error(err);
    }
  });
};
