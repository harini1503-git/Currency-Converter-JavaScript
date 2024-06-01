const Base_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns= document.querySelectorAll("select");
const btn= document.querySelector("button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector("#msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOptions= document.createElement("option");
        newOptions.innerHTML= currcode;
        newOptions.value= currcode;

        if(select.name==="from" && currcode=== "USD"){
            newOptions.selected= "selected";
        }else if(select.name==="to" && currcode=== "INR"){
            newOptions.selected= "selected";
        }

        select.append(newOptions);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);                                             //select is the target tag here!!!!
    });
}


const updateFlag= (element)=>{                                          // element is evt.target is argument here
    let currcode= element.value;                                        //select value from evt.target
    let countryCode= countryList[currcode];                             //countrylist of currcode in select options
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`       //flags of desired countrycode
    let img= element.parentElement.querySelector("img");
    img.src= newsrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();                                               // removes the default things in the website and to make a new change by ourself
    let amount= document.querySelectorAll(".amount input");
    let amtval= amount.value;
    if(amtval===""|| amtval<1){
        amtval=1;
        amount.value= "1";
    }
    const URL= `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;    //api can only access small letter so the value of the from and to is converted to lower case
    let response= await fetch(URL);
    let data= response.json();
    let rate= data[toCurr.value.toLowerCase()];
    
    let finalamt= amtval * rate;
    msg.innerHTML= `${amtval} ${fromCurr} = ${finalamt} ${toCurr}`
});
