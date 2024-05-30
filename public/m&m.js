const dropdownToggle = document.querySelector("#dropdownToggle");
const dropdownContent = document.querySelector("#dropdownContent");
const requestForm = document.querySelector("#Films");
const submitBtn = document.querySelector("#submitForm")
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector("#closeBtn");

submitBtn.addEventListener("click", submit);
dropdownToggle.addEventListener("click", dropdown);

function dropdown() {
  if (dropdownContent.classList.contains("show")) {
    console.log("shown");
    dropdownContent.classList.remove("show");
    dropdownContent.classList.add("hidden");
  } else {
    dropdownContent.classList.remove("hidden");
    dropdownContent.classList.add("show");
  }
}

function submit(e) {
  e.preventDefault();
  console.log("submited");

  const formData = new FormData(requestForm);
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
        document.querySelector("#submitImg").src = "./assets/eatwaffle.png";
        modal.style.display = "block";
        closeBtn.addEventListener("click", function () {
          modal.style.display = "none";
          requestForm.reset();
        });
      } else {
        alert("error sending request, tell jacob to fix it");
      }
    })
    .catch((err) => {
      console.error("Error", err);
      alert("oops jacob didnt fix this code mjs.53");
    });
}

// sparkle time
function randomPosition(max) {
  console.log("getting random")
  return Math.floor(Math.random() * max);
}

function createSparkle(className, animationDuration) {
  console.log("init create sparkel")
  const sparkle = document.createElement("div");
  console.log("atempting to generate")
  sparkle.classList.add("sparkle")
  sparkle.classList.add(className)
  sparkle.style.top = randomPosition(window.innerHeight) + "px";
  sparkle.style.left = randomPosition(window.innerWidth) + "px";
  sparkle.style.animationDuration = animationDuration + "s";
  document.body.appendChild(sparkle)
}

for (let i = 0; i < 20; i++) {
  createSparkle("sparkle1", 2);
  createSparkle("sparkle2", 5)
  console.log("ran sparkle")
}
