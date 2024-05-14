const punchText = document.getElementById("punchText");
const brunchText = document.getElementById("brunchText");
const targetDate = new Date(2024, 4, 25, 11, 0, 0).getTime();
const countDown = document.querySelector("#countdown");
const dropdownToggle = document.querySelector("#dropdownToggle");

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countDown.innerHTML = `Time till next brunch: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

punchText.addEventListener("click", toggleImages);
brunchText.addEventListener("click", toggleImages);
dropdownToggle.addEventListener("click", dropdown);

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

function dropdown() {
  const dropdownContent = document.querySelector("#dropdownContent");
  if (dropdownContent.classList.contains("show")) {
    console.log("shown");
    dropdownContent.classList.remove("show");
    dropdownContent.classList.add("hidden");
  } else {
    dropdownContent.classList.remove("hidden");
    dropdownContent.classList.add("show");
  }
}

function loadHomeContent() {
  fetch("home.html")
    .then((res) => res.text())
    .then((data) => {
      document.open();
      document.write(data);
      document.close();
      console.log("Event listener being attached");
      const dropdownContent = document.querySelector("#dropdownContent");
      const dropdownToggle = document.querySelector("#dropdownToggle");
      dropdownToggle.addEventListener("click", dropdown);

      document
        .querySelector("#submitForm")
        .addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector("#submitImg").src = "./assets/eatwaffle.png";
          console.log("submited");

          document
            .querySelector("#submitForm")
            .addEventListener("mouseup", function (e) {
              e.preventDefault();
              document.getElementById("submitButtonImage").src =
                "./assets/waffleWhole.png";
            });
          const formElement = document.querySelector("#mailer");
          const formData = new FormData(formElement);
          console.log(formData);
          fetch("https://getform.io/f/6388ce58-e971-4876-a25c-693527db2114", {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          })
            .then((res) => {
              if (res.ok) {
                const modal = document.querySelector("#myModal");
                modal.style.display = "block";
                document
                  .querySelector("#closeBtn")
                  .addEventListener("click", function () {
                    modal.style.display = "none";
                  });
                document.querySelector("#mailer").reset();
              } else {
                alert("error sending tell jacob to fix it");
              }
            })
            .catch((err) => {
              console.err("Error", err);
              alert("oops jacob didn't fix this code");
            });
        });
    })
    .catch((err) => console.error("could not fetch home", err));
}
