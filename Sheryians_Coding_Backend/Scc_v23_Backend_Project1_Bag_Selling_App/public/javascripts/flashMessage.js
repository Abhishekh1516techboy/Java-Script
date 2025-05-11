// Show flash message with slide-in and yo-yo bounce after 200ms delay
setTimeout(() => {
  const flash = document.getElementById("flash-message");
  if (flash) {
    flash.classList.remove("translate-x-full", "opacity-0");
    flash.classList.add("translate-x-0", "opacity-100", "yoyo-bounce");
  }
}, 150);

// Auto remove flash after 5 seconds
setTimeout(() => {
  removeFlash();
}, 5000);

// Function to remove flash
function removeFlash() {
  const flash = document.getElementById("flash-message-container");
  if (flash) {
    flash.remove();
  }
}
