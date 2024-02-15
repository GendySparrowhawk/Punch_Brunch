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
      document.open();
      document.write(data);
      document.close();
      // const parser = new DOMParser();
      // const newDocument = parser.parseFromString(data, "text/html");
      // document.open();
      // document.write(newDocument.documentElement.outerHTML);
      // document.close();
      // document.body.innerHTML = data;
      console.log("Event listener being attached");
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
          fetch("/send-email", {
            method: "POST",
            body: formData,
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
              alert("oops jacob didnt fix this code");
            });
        });
    })
    .catch((err) => console.error("could not fetch home", err));
}
