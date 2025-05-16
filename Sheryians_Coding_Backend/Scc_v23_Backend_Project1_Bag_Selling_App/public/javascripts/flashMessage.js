// Show flash message with slide-in and yo-yo bounce after 200ms delay
setTimeout(() => {
  const flash = document.getElementById("flash-message");
  if (flash) {
    flash.classList.remove("translate-x-full", "opacity-0");
    flash.classList.add("translate-x-0", "opacity-100", "yoyo-bounce");

    // Play sound based on flash background
    if (flash.classList.contains("bg-green-600")) {
      playSound("/audio/success.mp3");
    } else if (flash.classList.contains("bg-red-600")) {
      playSound("/audio/error.mp3");
    }
  }
}, 150);

// Auto remove flash after 5 seconds
setTimeout(removeFlash, 5000);

function removeFlash() {
  const flash = document.getElementById("flash-message");
  if (flash) {
    flash.classList.remove("translate-x-0", "opacity-100");
    flash.classList.add("translate-x-full", "opacity-0");
    // Wait for animation to complete before removing
    setTimeout(() => flash.remove(), 3000);
  }
}

// Function to play sound safely on success and on error
const playSound = (src) => {
  const audio = new Audio(src);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};
