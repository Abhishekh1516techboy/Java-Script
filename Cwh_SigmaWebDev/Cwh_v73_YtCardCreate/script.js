let toggle = 0;
document.getElementById("yt-menu").addEventListener("click", () => {
  document.getElementById("yt-left-nav-slide").classList.toggle("yt-l-n-s-toggle");
  document.getElementById("yt-playlist-fullNav-slider").classList.toggle("yt-p-f-s-toggle");
  if (toggle === 0) {
    document.getElementById("yt-playlist-main-card").style.width = "30%";
    document.getElementById("yt-playlist-main-card-box").style.width = "92%";
    toggle=1;
  } else {
    document.getElementById("yt-playlist-main-card").style.width = "25%";
    document.getElementById("yt-playlist-main-card-box").style.width = "95%";
    toggle=0;
  }
});


document.getElementById("yt-input-form").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("yt-search-bar").value = "";
});

document.getElementById("yt-left-slide-Subscriptions-sm").addEventListener("click", () => {
  let container = document.getElementById("yt-left-slide-Subscriptions");
  let hiddenItems = document.querySelectorAll(".hidden-item");

  if (container.classList.contains("expand")) {
    container.classList.remove("expand");
    hiddenItems.forEach(item => item.style.display = "none");
    document.getElementById("yt-left-slide-showMore-btn").innerText = "Show more";
    document.getElementById("yt-left-slide-sm-svg").style.rotate = "unset";
  } else {
    container.classList.add("expand");
    hiddenItems.forEach(item => item.style.display = "flex");
    document.getElementById("yt-left-slide-showMore-btn").innerText = "Show less";
    document.getElementById("yt-left-slide-sm-svg").style.rotate = "180deg";
  }
});


document.getElementById("yt-search-bar").addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  document.getElementById("yt-search-bar").style.border = "0.01px solid #4ba3e2"
  document.getElementById("yt-inner-search-icon").style.width = "4%";
  document.getElementById("yt-inner-search-icon").style.visibility = "visible";
  document.getElementById("yt-search-bar").style.borderTopLeftRadius = "unset"
  document.getElementById("yt-search-bar").style.borderBottomLeftRadius = "unset"
  document.getElementById("yt-search-bar").style.borderLeft = "none"
});

document.body.addEventListener("click", () => {
  document.getElementById("yt-search-bar").style.border = "0.01px solid #353a3e"
  document.getElementById("yt-inner-search-icon").style.width = "0%";
  document.getElementById("yt-inner-search-icon").style.visibility = "hidden";
  document.getElementById("yt-search-bar").style.borderTopLeftRadius = "20px"
  document.getElementById("yt-search-bar").style.borderBottomLeftRadius = "20px"
});
