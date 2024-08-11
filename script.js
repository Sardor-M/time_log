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
    popUp = d.getElementById("popup"),
    popUpTableContainer = d.getElementById("popup-table-container"),
    popUpWeeksLeft = d.getElementById("popup-week-left"),
    popUpYearsLeft = d.getElementById("popup-year-progress"),
    exitButton = d.getElementsByClassName("exit")[0];

  calendar.addEventListener("click", function () {
    birhtdayInput.type = "date";
    birhtdayInput.focus();
  });

  birhtdayInput.addEventListener("blur", function () {
    birhtdayInput.type = "text";
  });

  // exit button
  exitButton.addEventListener("click", function () {
    popUp.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    event.target === popUp ? (popUp.style.display = "none") : "";
  });

  submitBtn.addEventListener("click", handleCalendarChange);

  // function to handle the calendar date change
  function handleCalendarChange() {
    var birthday = new Date(birhtdayInput.value);
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
    var today = new Date();
    var weeksLived = Math.floor(
      Math.abs(birthday - today) / (1000 * 60 * 60 * 24 * 7)
    );

    var weeksRemaining = tableRowSize * tableDataSize - weeksLived;

    weeksLivedSpan.textContent = weeksLived;
    weeksRemainingSpan.textContent = weeksRemaining;

    tableContainer.innerHTML = "";
    for (var i = 0; i < tableRowSize; i++) {
      var tableRow = d.createElement("tr");
      for (var b = 0; b < tableDataSize; b++) {
        var tableData = d.createElement("td");
        var weekNum = i * tableDataSize + b;
        var weekYear = new Date(
          birthday.getTime() + weekNum * 7 * 24 * 60 * 60 * 1000
        ).getFullYear();
        tableData.setAttribute(
          "data-week",
          "Week" + weekNum + "(" + weekYear + ")"
        );
        tableData.setAttribute("date-year", weekYear);

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
        tableData.addEventListener("click", function (event) {
          displayPopUp(birthday, event.target.getAttribute("date-year"));
        });

        tableRow.appendChild(tableData);
      }
      table.appendChild(tableRow);
    }
    tableContainer.appendChild(table);
  }

  function displayPopUp(birthday, selectedYear) {
    var now = new Date();
    var currentYear = now.getFullYear();
    var nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(currentYear);

    if (nextBirthday < now) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    var weeksUntilNextBirthday = Math.ceil(
      (nextBirthday - now) / (1000 * 60 * 60 * 24 * 7)
    );
    var yearProgress = Math.round((1 - weeksUntilNextBirthday / 52) * 100);

    popUpTableContainer.innerHTML = "";
    var popupTable = d.createElement("table");
    popupTable.classList.add("popup-table");

    for (var i = 0; i < 4; i++) {
      var popupTableRow = d.createElement("tr");
      for (var b = 0; b < 13; b++) {
        var popupTableData = d.createElement("td");
        var weekIndex = i * 13 + b;
        var weekDate = new Date(nextBirthday);
        weekDate.setDate(weekDate.getTime() - (52 - weekIndex) * 7);

        weekDate < now
          ? popupTableData.classList.add("past")
          : weekDate > now
          ? popupTableData.classList.add("future")
          : popupTableData.classList.add("current");

        popupTableRow.appendChild(popupTableData);
      }
      popupTable.appendChild(popupTableRow);
    }
    popUpTableContainer.appendChild(popupTable);

    popUpYearsLeft.textContent = "Progress: " + yearProgress + "%";
    popUpYearsLeft.style.fontFamily = "Space Mono, monospace";

    popUpWeeksLeft.textContent = "Weeks left:  " + weeksUntilNextBirthday;
    popUpWeeksLeft.style.fontSize = "16px";

    popUp.style.display = "block";
  }
})(document);
