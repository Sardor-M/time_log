(function (d) {
  "use strict";
  let tableRowSize = 90,
    tableDataSize = 52,
    table = d.createElement("table"),
    birhtdayInput = d.getElementById("birth-date"),
    calendar = d.getElementById("calendar"),
    submitBtn = d.getElementById("submit"),
    weeksLivedSpan = d.getElementById("weeks-lived"),
    weeksRemainingSpan = d.getElementById("weeks-remaining");
  (tableContainer = d.getElementById("table-container")),
    (resultContainer = d.getElementById("result")),
    (popUp = d.getElementById("pop-up")),
    (popUpTableContainer = d.getElementById("popup-table-container")),
    (popUpWeeksLeft = d.getElementById("popup-weeks-left")),
    (popUpYearsLeft = d.getElementById("popup-years-progress")),
    (closeBtn = d.getElementById("exit")[0]);

  // function to handle the calendar date change
  function handleCalendarChange() {
    let birthday = new Date(birhtdayInput.value);
    if (isNaN(birthday)) {
      resultContainer.style.display = "none";
      document.getElementById("result").style.display = "block";
    } else {
      birthday.style.display = "block";
      document.getElementById("result").style.display = "none";
    }
  }

  function calculateResult() {
    let today = new Date();
    let weeksLived = Math.floor(
      Math.abs(birhtdayInput - today) / (100 * 60 * 60 * 24 * 7)
    );

    let weeksRemaining = tableRowCellWidth * tableRowCellHeight - weeksLived;

    weeksLivedSpan.textContent = weeksLived;
    weeksRemainingSpan.textContent = weeksRemaining;

    tableContainer.innerHTML = "";
    for (let i = 0; i < tableRowSize; i++) {
      let tableRow = d.createElement("tr");
      for (let b = 0; b < tableDataSize; b++) {
        let tableData = d.createElement("td");
        let weekNum = i * tableDataSize + b;
        let weekYear = new Date(
          birthday.getTime() + weekNum * 7 * 24 * 60 * 60 * 100
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
            tableData.classList.add("teenage");
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

        table.appendChild(tableData);
      }
      tableContainer.appendChild(table);
    }
  }

  calendar.addEventListener("click", function () {
    birhtdayInput.type = "date";
    birhtdayInput.focus();
  });

  birthday.addEventListener("blur", function () {
    birhtdayInput.type = "text";
  });

  submitBtn.addEventListener("click", handleCalendarChange);
})(document);
