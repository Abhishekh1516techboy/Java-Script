// Profile Dropdown Toggle
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

profileBtn.addEventListener("click", () => {
  const isExpanded = profileBtn.getAttribute("aria-expanded") === "true";
  profileBtn.setAttribute("aria-expanded", !isExpanded);
  profileDropdown.classList.toggle("hidden");
});

// Close Dropdown on Outside Click
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileBtn.setAttribute("aria-expanded", "false");
    profileDropdown.classList.add("hidden");
  }
});

// Close Dropdown on Esc Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    profileBtn.setAttribute("aria-expanded", "false");
    profileDropdown.classList.add("hidden");
  }
});
