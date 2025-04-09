// Delete user from AllUsers List Routes
const deleteUser = (email) => {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`/user/delete/${email}`, {
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
