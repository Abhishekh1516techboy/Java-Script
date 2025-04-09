// Delete task
const deleteTask = (element) => {
  if (confirm("Are you sure you want to delete this Task?")) {
    fetch(`/delete/files/${element}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
        } else if (res.ok) {
          window.location.reload();
        } else {
          return res.json().then((data) => {
            alert(data.error || "Failed to delete Task");
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting Task:", err);
        alert("An error occurred while deleting the Task.");
      });
  }
};
