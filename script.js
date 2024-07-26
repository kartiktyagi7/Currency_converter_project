const URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const drpdwn=document.querySelectorAll(".dropdown select");
const newbtn= document.querySelector("form button");
const FromCurr=document.querySelector(".from select");
const ToCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of drpdwn){
    for(currCode in countryList){
        let opt= document.createElement("option");
        opt.innerText=currCode;
        opt.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            opt.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            opt.selected = "selected";
        }
        select.append(opt);
    }
    select.addEventListener("change", (evt)=>{
        flagUpdate(evt.target);
    });
}

const flagUpdate= (element) => {
    let currCode=element.value;
    let country=countryList[currCode];
    let newSrc=`https://flagsapi.com/${country}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


const updateRate= async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL2=`${URL}/${FromCurr.value.toLowerCase()}.json`;
    let result= await fetch(URL2);
    let data= await result.json();
    let rate=data[FromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()]; 
    let ans=amtVal*rate;
    msg.innerText=`${amtVal}${FromCurr.value} = ${ans}${ToCurr.value}`;
};
newbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
});


// window.addEventListener("load",()=>{
//     updateRate();
// });