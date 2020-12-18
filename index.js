
//get Dom element

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');

const symbolsEl = document.getElementById('symbols');
const numberEl = document.getElementById('numbers');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

generateEl.addEventListener("click" ,() =>{
    const length = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerHTML = generatePassword(hasLower, hasUpper,hasNumber, hasSymbol,length);
} )
const randomFunc = {
    lower: getRandomLower,
    upper : getRandomUpper,
    number : getRandomNumber,
    symbol : getRandomSymbol

}
//Copy the password to the clipboard

clipboardEl.addEventListener("click",() =>{
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied successfully");
})


//Generate Password Function

function generatePassword( lower,upper,  number,symbol,length){
// 1 . Init password variable
//2. Filter out unchecked types
//3. Loop over length call generator function for each types
//4. Add final password to the password variable and return it

let generatePassword = "";

const typeCount = lower + upper + number + symbol;

// console.log('typesCount: ', typeCount);

const typeArr = [{lower},{upper},{number},{symbol}].filter((item) => Object.values(item)[0])
// console.log(typeArr); 

if(typeCount === 0){
    return '';
}
for(let i=0; i<length; i+= typeCount){
    typeArr.forEach(type =>{
         const funName = Object.keys(type)[0];

         generatePassword += randomFunc[funName](); 
    });
}
const finalPassword = generatePassword.slice(0,length);
return finalPassword;
}



// Get Functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26 +97))
}

// console.log(getRandomLower());

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26 +65))
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 +48))
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}=<>,.'
    return symbol[Math.floor(Math.random() * symbol.length)];
}
// console.log(getRandomSymbol());
