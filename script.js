const calendar = document.querySelector('.calendar');
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const submitBtn = document.getElementById("submit");

let currDate;
let currDay;
let currYear;
let pstDate;
let userDate;
let monthIndex;
let currMonth = document.querySelector("#month");
let monthIndexMonth;
let cd;

getPhilippineTime();

const generateCalendar = (month, year, currDay) => {
  const calendarDays = calendar.querySelector('.calendar-days');
  const calendarHeaderMonth = calendar.querySelector('#month');
  const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calendarDays.innerHTML = '';

  const currentMonth = monthNames[month];
  calendarHeaderMonth.innerHTML = currentMonth;

  // get first day of month
  const firstDay = new Date(Date.UTC(year, month, 1));

  // calculate how many squares are needed to fill up the 42 squares
  const remainingSquares = 42 - (daysOfMonth[month] + firstDay.getUTCDay());

  let maxMonthIndex = month + 1;
  let maxYear = year;
  if (maxMonthIndex > 11) {
    maxMonthIndex = 0;
    maxYear = year + 1;
  }

  for (let i = 0; i < daysOfMonth[month] + firstDay.getUTCDay() + remainingSquares; i++) {
    const day = document.createElement('div');

    if (i >= firstDay.getUTCDay() && i < daysOfMonth[month] + firstDay.getUTCDay()) {
      day.classList.add('calendar-day-hover');
      day.innerHTML = i - firstDay.getUTCDay() + 1;
      day.innerHTML += '';

      userDate = new Date(Date.UTC(year, month, i - firstDay.getUTCDay() + 1));
      if (userDate < pstDate) {
        day.classList.add('calendar-day-disabled');
      }
      // If Saturday or Sunday
      if (userDate.getUTCDay() === 0 || userDate.getUTCDay() === 6) {
        day.classList.add('calendar-day-disabled');
      } else {
        if (i - firstDay.getUTCDay() + 1 === parseInt(currDay) && parseInt(year) === new Date().getFullYear() && month === new Date().getMonth()) {
          day.classList.add('curr-date');
          day.classList.add('calendar-day-disabled');
        }
      }
    } else {
      // add empty squares to fill up the remaining squares
      calendarDays.appendChild(day);
    }

    // Break loop after 2 months have been generated
    if (i >= daysOfMonth[month] + firstDay.getUTCDay() + remainingSquares - 1) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }

      if (month === maxMonthIndex && year === maxYear) {
        break;
      }

      daysOfMonth[1] = getFebDays(year);
      const nextMonth = monthNames[month];
      const calendarHeaderYear = calendar.querySelector('#year');
      calendarHeaderYear.innerHTML = year;
      calendarHeaderMonth.innerHTML = nextMonth;
      firstDay.setUTCFullYear(year, month, 1);
      remainingSquares = 42 - (daysOfMonth[month] + firstDay.getUTCDay());
    }
    calendarDays.appendChild(day);
  }
};

document.querySelector('#prev-month').onclick = () => {
  monthIndexMonth--;
  if (monthIndexMonth < parseInt(monthIndex)) {
    monthIndexMonth = monthIndex;
    alert("Minimum Month Reached");
    return;
  }
  const currentYear = currYear;
  generateCalendar(monthIndexMonth, currentYear, currDay);
};

document.querySelector('#next-month').onclick = () => {
  if (monthIndexMonth > monthIndex) {
    alert("Maximum Month Reached");
    return;
  }
  if (monthIndexMonth === monthIndex) {
    monthIndexMonth++;
  }
  const currentYear = currYear;
  generateCalendar(monthIndexMonth, currentYear, currDay);
};

// get a reference to the current date element in the calendar
const currentDateElement = document.querySelector('.curr-date');
let as;
let ps;

// add an event listener for clicks on the parent container of the divs
document.querySelector(".calendar-days").addEventListener("click", function(event) {
  // reset hour slots
  const hs = document.getElementById('hours');
  // check if the element clicked is a div
  if (event.target.tagName === "DIV") {
    // check if the clicked element is the current date element
    if (event.target === currentDateElement) {
      // prevent the default click behavior
      event.preventDefault();
    } else {
      const selectedDate = new Date(
        Date.UTC(
          currYear,
          monthNames.indexOf(document.getElementById('month').innerHTML),
          event.target.innerHTML
        )
      );
      if (event.target.innerHTML === "") {
        event.preventDefault();
        return;
      }
      if (event.target.classList.contains("calendar-days")) {
        event.preventDefault();
        return;
      }
      if (selectedDate.getFullYear() <= pstDate.getFullYear() &&
        selectedDate.getMonth() <= pstDate.getMonth() &&
        selectedDate.getDate() <= pstDate.getDate()) {
        // disable selection of previous days
        event.preventDefault();
        return;
      }
      if (selectedDate.getUTCDay() === 0 || selectedDate.getUTCDay() === 6) {
        // disable selection of Saturdays and Sundays
        event.preventDefault();
        return;
      }

      // remove the 'clicked' class from all divs
      const divs = document.getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("curr-date");
      }

      // code to execute when a div is clicked
      event.target.classList.add('curr-date');
      month = document.getElementById('month').innerHTML;
      day = event.target.innerHTML;
      cd = month + " " + day + ", " + currYear;
      //document.getElementById('date-picker').innerHTML = cd;

      if (hs.length === 1) {
        const a = new Option("AM");
        const p = new Option("PM");

        hs.add(a);
        hs.add(p);
      }
      const am = hs.options[1];
      const pm = hs.options[2];
      am.disabled = false;
      pm.disabled = false;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "includes/extract_scheds.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const rO = JSON.parse(xhr.responseText);
          const hour_slot = document.getElementById('hours');
          as = rO.am_count;
          ps = rO.pm_count;

          if (as >= 5) {
            const disable = hour_slot.options[1];
            disable.disabled = true;
          }
          if (ps >= 5) {
            const disable = hour_slot.options[2];
            disable.disabled = true;
          }
        }
      };
      xhr.send('date=' + cd);
    }
  }
});

submitBtn.addEventListener("click", function(event) {
  const a = document.getElementById("fullname");
  const b = document.getElementById("email");

  if (a.value.trim() === "" || b.value.trim() === "" || cd.trim() === "") {
    event.preventDefault();
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "includes/appoint.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onerror = function() {
    alert("An error occurred while processing the request. 1");
    location.reload();
  };
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
    } else {
      alert("An error occurred while processing the request. 2");
      location.reload();
      event.preventDefault();
    }
  };
  try {
    xhr.send('date=' + encodeURIComponent(cd) + "&name=" + encodeURIComponent(a.value.trim()) + "&email=" + encodeURIComponent(b.value.trim()));
    alert("Your Appointment is now submitted");
  } catch {
    alert("An error occurred while processing the request. 3");
    location.reload();
  }
});

function getPhilippineTime() {
  // Get the current date and time in Philippine Standard Time
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'includes/phtime.php');
  xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const serverTime = xhr.responseText;
      const p = serverTime.split(" ");
      const d = p[1].split(",");
      currYear = p[2];
      pstDate = new Date(serverTime);
      monthIndexMonth = monthNames.findIndex(m => m.toLowerCase() === p[0].toLowerCase());
      monthIndex = monthIndexMonth;
      generateCalendar(monthIndexMonth, currYear, d[0]);
    } else {
      alert("An error occurred while processing the request. 4");
      location.reload();
    }
  };
  xhr.onerror = function() {
    console.error('An error occurred while processing the request.');
  };
  xhr.send();
}
//CHECK EMAIL FORMAT
function validateEmail(mail) 
{
  if ("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/".test(mail))
		return true;
	return false;
}

//FAQ



function toggleForm() {
  var formOverlay = document.querySelector('.faq-overlay');
  formOverlay.style.display = 'flex';
}

function closeForm() {
  var formOverlay = document.querySelector('.faq-overlay');
  formOverlay.style.display = 'none';
}

function toggleAnswer(event) {
  var clickedAnswer = event.target.nextElementSibling;

  // Get all the answer divs
  var allAnswers = document.querySelectorAll('.answer');

  // Iterate over all answer divs and remove 'show' class
  allAnswers.forEach(function(answer) {
    if (answer !== clickedAnswer) {
      answer.classList.remove('show');
    }
  });

  // Toggle the 'show' class for the clicked answer
  clickedAnswer.classList.toggle('show');
}



function startShaking() {
  var faqIcon = document.querySelector('.faq-icon');
  faqIcon.classList.add('shake');
  setTimeout(stopShaking, 3000); // Stop shaking after 5 seconds
}

function stopShaking() {
  var faqIcon = document.querySelector('.faq-icon');
  faqIcon.classList.remove('shake');
  setTimeout(startShaking, 3500); // Start shaking again after a 3.5-second pause
}

// Initial start shaking after 5 seconds
setTimeout(startShaking, 5000);

// keypress disable character

function restrictCharacters(event) {
  var charCode = event.keyCode || event.which;
  var charStr = String.fromCharCode(charCode);
  var pattern = /[a-zA-Z. ]/;
  return pattern.test(charStr);
}

function restrictCharactersemail(event) {
  var charCode = event.keyCode || event.which;
  var charStr = String.fromCharCode(charCode);
  var pattern = /[a-zA-Z.@0-9 ]/;
  return pattern.test(charStr);
}

document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('faq-overlay');
  var boxes = document.querySelectorAll('faq .question');
  
  boxes.forEach(function(box) {
    box.addEventListener('click', function() {
      container.scrollTop = 0;
    });
  });
});

function toggleAnswer(event) {
  var question = event.target;
  var answer = question.nextElementSibling;
  var form = question.closest('.faq-form');

  // Close previously opened answer
  var openAnswers = form.querySelectorAll('.answer.show');
  openAnswers.forEach(function(openAnswer) {
    openAnswer.classList.remove('show');
  });

  // Toggle current answer
  answer.classList.toggle('show');
  scrollToQuestion(question, form);
}

function scrollToQuestion(question, form) {
  var scrollOptions = {
    behavior: 'smooth',
    block: 'start'
  };

  question.scrollIntoView(scrollOptions);
}

