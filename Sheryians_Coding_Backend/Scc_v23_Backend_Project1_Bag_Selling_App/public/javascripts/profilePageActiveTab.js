// Tab Switching
function switchTab(tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.add("hidden"));
  document.querySelectorAll('[id$="Tab"]').forEach((tab) => {
    tab.classList.remove("active-tab", "bg-indigo-50", "text-indigo-700");
    tab.classList.add("hover:bg-gray-100", "text-gray-700");
  });
  document.getElementById(tabName + "Content").classList.remove("hidden");
  document
    .getElementById(tabName + "Tab")
    .classList.add("active-tab", "bg-indigo-50", "text-indigo-700");
  document
    .getElementById(tabName + "Tab")
    .classList.remove("hover:bg-gray-100", "text-gray-700");

  // Save the active tab to localStorage
  localStorage.setItem("activeTab", tabName);
}

// Initialize Tab
document.addEventListener("DOMContentLoaded", () => {
  // Get the active tab from localStorage, default to 'profile' if not set
  const activeTab = localStorage.getItem("activeTab") || "profile";
  switchTab(activeTab);
});

// Order Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const orderItems = document.querySelectorAll(".order-item");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active-tab"));
    btn.classList.add("active-tab");
    const filter = btn.dataset.filter;
    orderItems.forEach((item) => {
      item.classList.remove("hidden");
      if (filter !== "all" && item.dataset.status !== filter) {
        item.classList.add("hidden");
      }
    });
  });
});
