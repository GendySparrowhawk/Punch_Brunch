const targetDate = new Date(2024, 11, 14, 11, 0, 0).getTime();
const countDown = document.querySelector("#countdown");
const dropdownToggle = document.querySelector("#dropdownToggle");
const submitBtn = document.querySelector("#submitForm");
const formElement = document.querySelector("#mailer");
const sparkleSize = 10;


// sparkle time
function randomPosition(max) {
  console.log("getting random")
  return Math.max(0, Math.min(Math.floor(Math.random() * max), max - sparkleSize));
}

function createSparkle(className, animationDuration) {
  console.log("init create sparkel")
  const sparkle = document.createElement("div");
  console.log("atempting to generate")

  sparkle.classList.add("sparkle", className)
  sparkle.style.top = randomPosition(window.innerHeight) + "px";
  sparkle.style.left = randomPosition(window.innerWidth) + "px";
  sparkle.style.animationDuration = animationDuration + "s";

  document.body.appendChild(sparkle)
}

// set countdown for splash page
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

for (let i = 0; i < 20; i++) {
  createSparkle("sparkle1", 2);
  createSparkle("sparkle2", 5)
  console.log("ran sparkle")
}


// attaching event listners
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  submit();
});


function submit() {
  document
    .querySelector("#submitForm")
    .addEventListener("mouseup", function (e) {
      e.preventDefault();
      document.getElementById("submitButtonImage").src =
        "./assets/waffleWhole.png";
    });
  const formData = new FormData(formElement);
  console.log(formData);
  fetch("https://formkeep.com/f/ec780e05791d", {
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
        document.querySelector("#submitImg").src = "./assets/eatwaffle.png";
        console.log("submited");
        document.querySelector("#mailer").reset();
      } else {
        alert("error sending tell jacob to fix it");
      }
    })
    .catch((err) => {
      console.err("Error", err);
      alert("oops jacob didn't fix this code");
    });
}

dropdownToggle.addEventListener("click", dropdown);

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