const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

api_key = "d2cf0344d14fb3cb6da3018d"
eUrl = "https://v6.exchangerate-api.com/v6/d2cf0344d14fb3cb6da3018d/latest/"
main_key = "https://v6.exchangerate-api.com/v6/d2cf0344d14fb3cb6da3018d/latest/USD"

const btn = document.querySelector("form button");
const toCurr  = document.querySelector(".To select")

const fromCurr  = document.querySelector(".From select")
const dropdowns  = document.querySelectorAll(".dropdown select") 
const fMsg = document.querySelector(".msg")
window.addEventListener("load" , () =>{
    updateExchangeRate()
})


for(let select of dropdowns){
    for(currcode in countryList){
        let newOptn =document.createElement("option")    
        newOptn.value = currcode
        newOptn.textContent = currcode; 
        if(select.name === "from" && currcode === "USD"){
            newOptn.selected = "selected"
        }else if(select.name  === "to" && currcode ==="INR"){
            newOptn.selected = "selected"
        }
        select.appendChild(newOptn); // Add option to the current <select>

    }
        select.addEventListener("change",(evt) =>{
            updateFlag(evt.target)
        })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc    
}


btn.addEventListener("click" , (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    


})

const updateExchangeRate = async ()=>{
    let amount = document.querySelector("#amount");
    let amountVal =amount.value
    if (amountVal === "" || amountVal <1){
        amountVal =1
        amount.value = 1
    }
    // console.log(fromCurr.value , toCurr.value)
    const mainUrl  =`https://v6.exchangerate-api.com/v6/d2cf0344d14fb3cb6da3018d/latest/${fromCurr.value}`
    let response = await fetch(mainUrl);
    let data = await response.json();
    // console.log(data); // Logs the actual JSON response
    keyM = "INR"
    let convertedRate = data.conversion_rates[toCurr.value]
    
    let finalAmount = Math.floor(convertedRate * amountVal * 100) / 100;
    fMsg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
}

