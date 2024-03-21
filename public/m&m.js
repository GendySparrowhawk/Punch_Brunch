const dropdownToggle = document.querySelector("#dropdownToggle");
const dropdownContent = document.querySelector("#dropdownContent");
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