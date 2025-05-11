export default function carousel(bags) {
  // Carousel Functionality
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".carousel-dot");
  const images = carousel.querySelectorAll("img"); // Select all images in the carousel

  let currentIndex = 1;
  let autoScroll;
  const realImages = Math.min(bags.length, 5);
  const totalImages = realImages + 2;


  function updateCarousel(animate = true) {
    if (!carousel) return;
    carousel.style.transition = animate ? "transform 0.7s ease-in-out" : "none";
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      const dotIndex = (currentIndex - 1 + realImages) % realImages;
      dot.classList.toggle("bg-orange-300", index === dotIndex);
      dot.classList.toggle("bg-orange-300/50", index !== dotIndex);
    });
  }

  function handleTransitionEnd() {
    if (currentIndex === 0) {
      currentIndex = realImages;
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else if (currentIndex === totalImages - 1) {
      currentIndex = 1;
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  function startAutoScroll() {
    if (autoScroll) clearInterval(autoScroll); // Clear any existing interval to prevent duplicates
    autoScroll = setInterval(() => {
      currentIndex++;
      updateCarousel(true);
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  // Wait for all images to load before starting the carousel
  function waitForImages() {
    const imageLoadPromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          // Image is already loaded (cached)
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            reject(new Error(`Failed to load image: ${img.src}`));
          };
        }
      });
    });

    Promise.all(imageLoadPromises)
      .then(() => {
        startAutoScroll();
        updateCarousel(false);
      })
      .catch((error) => {
        console.error("Error loading carousel images:", error);
        // Start the carousel anyway to avoid stalling
        startAutoScroll();
        updateCarousel(false);
      });
  }

  if (carousel && realImages > 0) {
    carousel.addEventListener("transitionend", handleTransitionEnd);

    nextBtn?.addEventListener("click", () => {
      currentIndex++;
      updateCarousel(true);
    });

    prevBtn?.addEventListener("click", () => {
      currentIndex--;
      updateCarousel(true);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetIndex = parseInt(dot.dataset.index);
        currentIndex = targetIndex + 1;
        updateCarousel(true);
      });
    });

    // Wait for images to load before starting auto-scroll
    waitForImages();

    // Reinitialize carousel when the tab becomes visible again
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        updateCarousel(false); // Re-render the carousel
        startAutoScroll(); // Restart auto-scroll
      } else {
        stopAutoScroll(); // Pause auto-scroll when tab is hidden
      }
    });

    window.addEventListener("resize", () => updateCarousel(false));
  } else {
    console.error(
      "Carousel not initialized. Element #carousel:",
      carousel,
      "Real images:",
      realImages
    );
  }

  return stopAutoScroll;
}
