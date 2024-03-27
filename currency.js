import { countryList } from './currency2.js';
let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropDown = document.querySelectorAll('.selectContainer select')
let button = document.querySelector('.exchange')
let from = document.querySelector('#fromMon')
let to = document.querySelector('#toMon')
const fromCurr = document.querySelector("#currFrom");
const toCurr = document.querySelector("#currTo");


for (let select of dropDown){
    
    for (let code in countryList){
        let newOption = document.createElement('option')
        newOption.value = code
        newOption.innerText = code
        if (select.name === 'from' && code === 'USD'){
            newOption.selected = 'selected'
        } else if (select.name === 'to' && code === 'PKR'){
            newOption.selected = 'selected'
        }
        select.append(newOption)
    }
    
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target)
    })
}

const exchangeRate = async  ()=>{
    let fromMoney = from.value
  

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    to.value = fromMoney * rate


    
        
    }


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  
  

button.addEventListener('click',(elem)=>{
  elem.preventDefault()
  exchangeRate()

})