
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


