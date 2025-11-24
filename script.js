const repaymentBtn = document.getElementById("repayment");
const interestBtn = document.getElementById("interest-only");
const mortgageAmount = document.getElementById("amount-input");
const mortgageLength = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const calculateBtn = document.getElementById("calculate");
const monthlyTotalText = document.getElementById("p-text-total-monthly");
const totalText = document.getElementById("p-text-total");
const noResultsContainer = document.getElementById("no-results-container");
const containerWithResults = document.getElementById("final-results-container");
const resetBtn = document.getElementById("reset-btn");
const mortgageIcon = document.getElementById("mortgage-amount-icon");
const mortgageContainer = document.getElementById("amount-container");
const amountErrorMessage = document.getElementById("amount-error-message");
const lengthIcon = document.getElementById("length-icon");
const lengthContainer = document.getElementById("mortgage-term-container");
const lengthErrorMessage = document.getElementById("length-error-message");
const interestErrorMessage = document.getElementById("interest-error-message");
const interestIcon = document.getElementById("interest-icon");
const interestContainer = document.getElementById("interest-container");
const mortgageTypeErrorMessage = document.getElementById(
  "mortgage-type-error-message"
);

// function for all the maths
function calculation() {
  let totalAmount = mortgageAmount.value.trim();
  let length = mortgageLength.value.trim();
  let interest = Number(interestRate.value.trim() / 100);
  let interestCalc = Number(totalAmount) * Number(interest);
  let totalPayment = Number(totalAmount) + Number(interestCalc);
  let monthlyPayment = (
    Number(totalPayment) /
    Number(length) /
    12
  ).toLocaleString();
  let totalPaymentsFinal = totalPayment.toLocaleString();
  monthlyTotalText.innerText = `£${monthlyPayment}`;
  totalText.innerText = `£${totalPaymentsFinal}`;
}

// function for the results container
function containerChange() {
  noResultsContainer.classList.add("hidden");
  containerWithResults.classList.remove("hidden");
}

// reset button functions
function containerReset() {
  noResultsContainer.classList.remove("hidden");
  containerWithResults.classList.add("hidden");
  repaymentBtn.checked = false;
  interestBtn.checked = false;
  mortgageAmount.value = "";
  mortgageLength.value = "";
  interestRate.value = "";
  amountErrorMessage.classList.add("hidden");
  mortgageIcon.style.backgroundColor = "var(--Slate-100)";
  mortgageIcon.style.color = "var(--Slate-700)";
  mortgageContainer.style.borderColor = "var(--Slate-500)";
  lengthErrorMessage.classList.add("hidden");
  lengthIcon.style.backgroundColor = "var(--Slate-100)";
  lengthIcon.style.color = "var(--Slate-700)";
  lengthContainer.style.borderColor = "var(--Slate-500)";
  interestErrorMessage.classList.add("hidden");
  interestIcon.style.backgroundColor = "var(--Slate-100)";
  interestIcon.style.color = "var(--Slate-700)";
  interestContainer.style.borderColor = "var(--Slate-500)";
  mortgageTypeErrorMessage.classList.add("hidden");
}

// amount error message
function amountError() {
  if (mortgageAmount.value < 1) {
    mortgageIcon.style.backgroundColor = "var(--Red)";
    mortgageIcon.style.color = "var(--White)";
    mortgageContainer.style.borderColor = "var(--Red)";
    noResultsContainer.classList.remove("hidden");
    containerWithResults.classList.add("hidden");
    amountErrorMessage.classList.remove("hidden");
  } else {
    mortgageIcon.style.backgroundColor = "var(--Slate-100)";
    mortgageIcon.style.color = "var(--Slate-700)";
    mortgageContainer.style.borderColor = "var(--Slate-500)";
    amountErrorMessage.classList.add("hidden");
  }
}

// mortgage term error message
function mortgageLengthError() {
  if (mortgageLength.value < 1) {
    noResultsContainer.classList.remove("hidden");
    containerWithResults.classList.add("hidden");
    lengthIcon.style.backgroundColor = "var(--Red)";
    lengthIcon.style.color = "var(--White)";
    lengthContainer.style.borderColor = "var(--Red)";
    lengthErrorMessage.classList.remove("hidden");
  } else {
    lengthErrorMessage.classList.add("hidden");
    lengthIcon.style.backgroundColor = "var(--Slate-100)";
    lengthIcon.style.color = "var(--Slate-700)";
    lengthContainer.style.borderColor = "var(--Slate-500)";
  }
}

// interest rate error message
function interestErrors() {
  if (interestRate.value < 0.000001) {
    noResultsContainer.classList.remove("hidden");
    containerWithResults.classList.add("hidden");
    interestErrorMessage.classList.remove("hidden");
    interestIcon.style.backgroundColor = "var(--Red)";
    interestIcon.style.color = "var(--White)";
    interestContainer.style.borderColor = "var(--Red)";
  } else {
    interestErrorMessage.classList.add("hidden");
    interestIcon.style.backgroundColor = "var(--Slate-100)";
    interestIcon.style.color = "var(--Slate-700)";
    interestContainer.style.borderColor = "var(--Slate-500)";
  }
}

// mortgage type error message
function mortgageTypeError() {
  if (!repaymentBtn.checked & !interestBtn.checked) {
    mortgageTypeErrorMessage.classList.remove("hidden");
    noResultsContainer.classList.remove("hidden");
    containerWithResults.classList.add("hidden");
  } else {
    mortgageTypeErrorMessage.classList.add("hidden");
  }
}

// calculate button
calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  calculation();
  containerChange();
  amountError();
  mortgageLengthError();
  interestErrors();
  mortgageTypeError();
});

// reset button listener
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  containerReset();
  // mortgageAmount.value("0");
});

// make sure only 1 of the mortgage types are checked
interestBtn.addEventListener("click", (e) => {
  repaymentBtn.checked = false;
});

repaymentBtn.addEventListener("click", (e) => {
  interestBtn.checked = false;
});
