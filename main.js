// bill input
const bill = document.querySelector('#bill');
// number of people input
const people = document.querySelector('#people');
// tip amount per person <p>
const tipPerPerson = document.querySelector('.tip-per-person');
// total per person <p>
const totalPerPerson = document.querySelector('.total-per-person');

// tip buttons in an array, 6 in total
const tipButtons = document.querySelectorAll('.tip');
// custom tip value input
const tipCustom = document.querySelector('.custom');
// reset button
const resetBtn = document.querySelector('#reset');
// error message
const errorMsg = document.querySelector('.error-msg');


// get the value from the bill input as a number
function getBillAmount() {
    // parseFloat method parses a value as a string and returns the first number
    const billAmount = parseFloat(bill.value);
    calculateTipAndTotal();
}

// get the value from the number of people input as a number.  if it is equal/smaller than 0, error message and red border will display
function getNumOfPeople() {
    const numOfPeople = parseFloat(people.value);
    if (numOfPeople <= 0) {
        errorMsg.style.display = 'block';
        people.classList.add("error-border");
    } else {
        errorMsg.style.display = 'none';
        people.classList.remove('error-border');
    }
    calculateTipAndTotal();
}

// get the value from the tip button.  apply to the forEach() function
function getTipValue(button) {
        tipValue = parseFloat(button.value) / 100;
        calculateTipAndTotal();    
}

// get the value from the custom tip value input
function getCustomTipValue(input) {
    tipValue = parseFloat(tipCustom.value) / 100;
    calculateTipAndTotal(); 
}     

// calculate tip and total and display results to the equivalent <p> element
function calculateTipAndTotal() {
    const billAmount = parseFloat(bill.value);
    const numOfPeople = parseFloat(people.value);
     if ((numOfPeople > 0) && (billAmount > 0) && (tipValue >= 0) ) {
        const tipAmount = (billAmount  * tipValue) / numOfPeople;
        const tipAmountTotal = (billAmount * tipValue);
        const total = (billAmount + tipAmountTotal) / numOfPeople;
        tipPerPerson.innerHTML = '$' + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = '$' + total.toFixed(2);
        // strong-cyan
        resetBtn.style.backgroundColor = 'hsl(172, 67%, 45%)';
    }      
}


// reset button to reset everything to zero
function reset() {
    bill.value = '';
    bill.placeholder = 0;
    errorMsg.style.display = 'none';
    people.value = '';
    people.placeholder = 0;
    people.classList.remove('error-border');
    tipValue = 0;
    tipButtons.forEach(button => button.classList.remove('active'))
    tipCustom.value = '';
    tipPerPerson.innerHTML = '$' + (0).toFixed(2);
    totalPerPerson.innerHTML = '$' + (0).toFixed(2);
    // dark-grayish-cyan
    resetBtn.style.backgroundColor = 'hsl(186, 14%, 43%)';
}

let tipValue = 0;   


bill.addEventListener('input', getBillAmount);
    // input event fires when the value of an input element is changed

people.addEventListener('input', getNumOfPeople);

tipCustom.addEventListener('input', getCustomTipValue);

tipButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
        event.preventDefault();
        // console.log(`Button ${i} clicked!`);
        // keep active state CSS style after clicking the button
        tipButtons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        tipCustom.value = '';
        getTipValue(button);
    });
})

// reset everything to default when reset button is clicked
resetBtn.addEventListener('click', reset);

// reset everything to default when page is refreshed
window.addEventListener('load', reset);
