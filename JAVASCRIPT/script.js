// make object calculator, for save condition calculator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

// make a general function calculator that is update number and delete data on the calc
function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// function for negative number
function inverseNumber(){
    if(calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// function for set operator
function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

          // reset value display number so next number start from first again
        calculator.displayNumber = '0';
    }else{
        alert("Operator sudah ditetapkan");
    }

  
}
// make a function for add number in the displayNumber calc
function inputDigit(digit){
   if(calculator.displayNumber === '0'){
       calculator.displayNumber = digit;
   }else{
       calculator.displayNumber += digit;
   }
}

// make function perform calculation for calculation value there is calculator object
function performCalculation(){
    if(calculator.firstNumber == null || calculator.operator == null){
       alert("Anda belum menetapkan operator");
       return; 
    }

    let result = 0;
    if(calculator.operator === "+"){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // object will send for argument function putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
}

// add event click button element
const buttons = document.querySelectorAll('.button');
for(let button of buttons){
    button.addEventListener('click', function(event){
        // get object when click an element
        const target = event.target;

        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

         if(target.classList.contains('operator')){
          handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

