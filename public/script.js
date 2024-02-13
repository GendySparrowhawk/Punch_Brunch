document.addEventListener("DOMContentLoaded", function () {
  const punchText = document.getElementById("punchText");
  const brunchText = document.getElementById("brunchText");

  punchText.addEventListener("click", toggleImages);
  brunchText.addEventListener("click", toggleImages);

  function toggleImages() {
    console.log("clicked");
    const leftImage = document.querySelector(".left-image").classList;
    const rightImage = document.querySelector(".right-image").classList;
    setTimeout(() => {
      leftImage.replace("left-image", "leave-left");
      rightImage.replace("right-image", "leave-right");
      console.log("animation complete");
    }, 100);

    setTimeout(loadHomeContent, 1000);
  }

  function loadHomeContent() {
    fetch("home.html")
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(data, "text/html");
        document.open();
        document.write(newDocument.documentElement.outerHTML);
        document.close();
        document.body.innerHTML = data;

        attachDropdown();
      })
      .catch((err) => console.error("could not fetch home", err));
  }
  attachDropdown();

  function attachDropdown() {
   
    document.addEventListener("click", function (e) {
      if (e.target.matches(".dropdown-btn")) {
        const dropdownContent = e.target.nextElementSibling;
        console.log("btn drop");
        dropdownContent.classList.toggle("show");
      } else if (!e.target.matches(".dropdown-content")) {
        
        const dropdownContents = document.querySelectorAll(".dropdown-content");
        dropdownContents.forEach(function (content) {
          if (content.classList.contains("show")) {
            content.classList.remove("show");
          }
        });
      }
    });
  }
});
