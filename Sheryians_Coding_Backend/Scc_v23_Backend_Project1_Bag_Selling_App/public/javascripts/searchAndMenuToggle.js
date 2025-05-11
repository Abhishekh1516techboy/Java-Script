// toggle menu
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// search menu
function toggleSearch() {
  const search = document.getElementById("mobileSearch");
  search.classList.toggle("hidden");
}

// Email DropDown Model width adjust
function adjustDropdownWidth() {
  const emailElement = document.getElementById("user-email");
  const dropdown = document.getElementById("profile-dropdown");
  if (emailElement && dropdown) {
    // Create a temporary span to measure email width
    const tempSpan = document.createElement("span");
    tempSpan.style.font = window.getComputedStyle(emailElement).font;
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.textContent = emailElement.textContent;
    document.body.appendChild(tempSpan);

    // Calculate desired width (email width + padding + image width + margins)
    const emailWidth = tempSpan.offsetWidth;
    const minWidth = 150; // Minimum width in pixels
    const calculatedWidth = emailWidth + 80; // Add padding, image, and margins

    // Set width within bounds
    dropdown.style.width = `${Math.max(
      minWidth,
      Math.min(calculatedWidth, window.innerWidth * 0.9)
    )}px`;

    // Clean up
    document.body.removeChild(tempSpan);
  }
}

// Run on load and resize
window.addEventListener("load", adjustDropdownWidth);
window.addEventListener("resize", adjustDropdownWidth);
