const titl = document.querySelector("#titleInput");
let flexb = document.getElementById("flexb");
let on = document.getElementById("one");
const listinp = document.querySelector("#listInput");
const ad = document.getElementById("addi");


ad.addEventListener("click",()=>{
    let newLi = document.createElement("textarea");
    
    newLi.placeholder="Type your text here...";
    on.appendChild(newLi);
    flexb.appendChild(on);
})