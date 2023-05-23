// Function to restrict characters based on a regular expression
function restrictCharacters(inputElement, pattern) {
  var inputValue = inputElement.value;
  var restrictedValue = inputValue.replace(pattern, '');
  if (restrictedValue !== inputValue) {
    inputElement.value = restrictedValue;
  }
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

function scrollToQuestion(question, form) {
  var formRect = form.getBoundingClientRect();
  var questionRect = question.getBoundingClientRect();
  var scrollTop = form.scrollTop + questionRect.top - formRect.top;

  form.scrollTo({
    top: scrollTop,
    behavior: 'smooth'
  });
}


function closeForm() {
  var formOverlay = document.querySelector('.faq-overlay');
  var form = formOverlay.querySelector('.faq-form');
  
  // Reset the form to its initial state
  resetForm(form);
  
  // Scroll the form to the top
  form.scrollTop = 0;
  
  // Hide the form overlay
  formOverlay.style.display = 'none';
}

function resetForm(form) {
  // Get all the answer divs
  var allAnswers = form.querySelectorAll('.answer');

  // Iterate over all answer divs and remove 'show' class
  allAnswers.forEach(function(answer) {
    answer.classList.remove('show');
  });
}


function toggleAnswer(event) {
  var question = event.target;
  var answer = question.nextElementSibling;
  var form = question.closest('.faq-form');

  // Close previously opened answer
  var openAnswers = form.querySelectorAll('.answer.show');
  openAnswers.forEach(function(openAnswer) {
    if (openAnswer !== answer) {
      openAnswer.classList.remove('show');
    }
  });

  // Toggle current answer
  answer.classList.toggle('show');
  scrollToQuestion(question, form);
}


