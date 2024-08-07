(function (d) {
  "use strict";
  var tableRowSize = 90,
    tableDataSize = 52,
    table = d.createElement("table"),
    birhtdayInput = d.getElementById("birthDate"),
    calendar = d.getElementById("calendar-button"),
    submitBtn = d.getElementById("submit-button"),
    weeksLivedSpan = d.getElementById("weeks-lived"),
    weeksRemainingSpan = d.getElementById("weeks-remaining"),
    tableContainer = d.getElementById("table-container"),
    resultContainer = d.getElementById("result"),
    popUp = d.getElementById("pop-up"),
    popUpTableContainer = d.getElementById("popup-table-container"),
    popUpWeeksLeft = d.getElementById("popup-weeks-left"),
    popUpYearsLeft = d.getElementById("popup-years-progress");
  // closeBtn = d.getElementById("exit")[0];

  calendar.addEventListener("click", function () {
    birhtdayInput.type = "date";
    birhtdayInput.focus();
  });

  birhtdayInput.addEventListener("blur", function () {
    birhtdayInput.type = "text";
  });

  submitBtn.addEventListener("click", handleCalendarChange);

  // function to handle the calendar date change
  function handleCalendarChange() {
    let birthday = new Date(birhtdayInput.value);
    if (isNaN(birthday)) {
      resultContainer.style.display = "none";
      document.getElementById("blog").style.display = "block";
    } else {
      calculateResult(birthday);
      resultContainer.style.display = "block";
      document.getElementById("blog").style.display = "none";
    }
  }

  function calculateResult(birthday) {
    let today = new Date();
    let weeksLived = Math.floor(
      Math.abs(birthday - today) / (1000 * 60 * 60 * 24 * 7)
    );

    let weeksRemaining = tableRowSize * tableDataSize - weeksLived;

    weeksLivedSpan.textContent = weeksLived;
    weeksRemainingSpan.textContent = weeksRemaining;

    tableContainer.innerHTML = "";
    for (let i = 0; i < tableRowSize; i++) {
      let tableRow = d.createElement("tr");
      for (let b = 0; b < tableDataSize; b++) {
        let tableData = d.createElement("td");
        let weekNum = i * tableDataSize + b;
        let weekYear = new Date(
          birthday.getTime() + weekNum * 7 * 24 * 60 * 60 * 1000
        ).getFullYear();
        tableData.setAttribute(
          "data-week",
          "Week" + weekNum + "(" + weekYear + ")"
        );
        tableData.setAttribute("data-year", weekYear);

        if (weekNum < weeksLived) {
          tableData.classList.add("past");
          if (weekNum < 2 * 52) {
            tableData.classList.add("infant");
          } else if (weekNum < 13 * 52) {
            tableData.classList.add("adult");
          }
        }

        if (weekNum === weeksLived) {
          tableData.classList.add("current");
        }
        tableData.addEventListener("mouseover", function () {
          this.classList.add("hover");
          this.style.transform = "scale(1.05)";
        });
        tableData.addEventListener("mouseout", function () {
          this.classList.remove("hover");
          this.style.transform = "scale(1)";
        });
        // tableData.addEventListener("click", function (event) {
        //   showPopup(birthday, event.target.getAttribute("data-year"));
        // });

        tableRow.appendChild(tableData);
      }
      table.appendChild(tableRow);
    }
    tableContainer.appendChild(table);
  }
})(document);
