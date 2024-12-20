let url_base="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector (".msg");

for(let s of dropdowns){
for(let i in countryList){
    //console.log(i,countryList[i]);
    let newop=document.createElement("option");
    newop.innerText=i;
    newop.value=i;
    
    if (s.name === "from" && i === "USD") {
        newop.selected = "selected";
      } else if (s.name === "to" && i === "INR") {
        newop.selected = "selected";
      }
      s.append(newop);
}
s.addEventListener("change",(evt)=>{
  updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
//console.log(element);
let curencyCode=element.value;
let countryCode=countryList[curencyCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};
    
 
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amval = amount.value;
  
  if (amval === "" || amval < 1) {
    amount.value = "1";
    amval = 1; 
  }

  
  const url = `${url_base}/${fromCurr.value.toLowerCase()}.json`;

  
  let response = await fetch(url);
  let data = await response.json();

 
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

      let finalAmount = amval * rate;

      msg.innerText = `${amval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
 
});
