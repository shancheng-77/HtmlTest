// 设置病情说明
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

// 设置选中的样式
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

// 设置input 的最小日期
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
const dateInput = document.getElementById("date");
dateInput.setAttribute("min", today);
dateInput.setAttribute("value", today);

// 校验pid输入
function validatePatientId(inputValue) {
  var pattern = /^[A-Z]{2}\d+[A-Z]$/; // 匹配格式
  if (pattern.test(inputValue)) {
    var digits = inputValue.match(/\d+/g);

    var sum = digits[0].split("").reduce((a, b) => parseInt(a) + parseInt(b));

    var remainder = sum % 26;
    var checksumLetter = String.fromCharCode(64 + remainder);

    var lastLetter = inputValue.charAt(inputValue.length - 1);

    if (lastLetter !== checksumLetter) {
      document.getElementById("validationResult").textContent =
        "Patient ID is invalid.";
      return false;
    }
    return true;
  } else {
    document.getElementById("validationResult").textContent = "Invalid format.";
    return false;
  }
}

const pidElement = document.getElementById("pid");

pidElement.addEventListener("input", (event) => {
  const value = event.target.value.toUpperCase();
  pidElement.value = value;
  validatePatientId(value);
});

// 按钮点击事件
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const pidValidateResult = validatePatientId(pidElement.value);
  const checkValue = document.querySelector(".selected input").value;
  if (pidValidateResult && checkValue) {
    const date = dateInput.value;

    console.log({
      pid: pidElement.value,
      date: date,
      time: checkValue,
    });

    // 清除表单
    pidElement.value = "";
    dateInput.value = "";
    checkList.forEach((element) => {
      element.checked = false;
    });
    checkLabelList.forEach((element) => {
      element.classList.remove("selected");
    });
  }
});
