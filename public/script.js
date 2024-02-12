document.addEventListener("DOMContentLoaded", function () {
  const punchText = document.getElementById("punchText");
  const brunchText = document.getElementById("brunchText");
  const leftImage = document.querySelector(".left-image");
  const rightImage = document.querySelector(".right-image");

  punchText.addEventListener("click", toggleImages);

  brunchText.addEventListener("click", toggleImages);

  function toggleImages() {
    leftImage.classList.toggle("fade-out-left");
    rightImage.classList.toggle("fade-out-right");
    setTimeout(loadHomeContent, 1000);
  }

  function loadHomeContent() {
    fetch("home.html")
      .then((res) => res.text())
      .then((data) => {
        document.body.innerHTML = data;
      })
      .catch((err) => console.error("could not fetch home", err));
  }
});
