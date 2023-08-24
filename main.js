const reasonMap = {
  "Childhood Vaccination Shots":
    "A disclaimer that multiple vaccines are normally administered in combination and may cause the child to be sluggish or feverous for 24 – 48 hours afterwards",
  "Influenza Shot":
    "The best time to get vaccinated is in April and May each year for optimal protection over the winter months",
  "Covid Booster Shot":
    "Advice that everyone should arrange to have their third shot as soon as possible and adults over the age of 30 should have their fourth shot to protect against new variant strains",
  "Blood Test":
    "That some tests require some fasting ahead of time and that a staff member will advise them on this prior to the appointment.",
};

const reasonSelect = document.getElementById("reason");

const reasonText = document.getElementById("advice-area");

reasonSelect.addEventListener("change", (event) => {
  reasonText.innerHTML = reasonMap[event.target.value];
});

const checkList = document.querySelectorAll(".timeSelect");
const checkLabelList = document.querySelectorAll(".selectLabel");

checkList.forEach((element, index) => {
  element.addEventListener("change", (event) => {
    if (event.target.value) {
      checkLabelList.forEach((element) => {
        element.classList.remove("selected");
      });
      checkLabelList[index].classList.add("selected");
    }
  });
});
