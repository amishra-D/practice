const sidbut = document.querySelector("#side-toggle-btn");
const sidebar = document.querySelector("#side");
const page = document.querySelector(".page");
const lis=document.querySelectorAll("li")
const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop();
let isOpen = false;
console.log(lis);
function toggleSidebar() {
    isOpen = !isOpen;
    sidebar.classList.toggle("open", isOpen);
    page.classList.toggle("shifted", isOpen);
    sidbut.classList.toggle("hidden", isOpen);
   if(currentFile==="notes.html" && isOpen){
    lis[1].style.backgroundColor="red";
   }
   if(currentFile==="lists.html" && isOpen){
    lis[2].style.backgroundColor="red";
   }
   if(currentFile==="calculator.html" && isOpen){
    lis[3].style.backgroundColor="red";
   }
   if(currentFile==="whiteboard.html" && isOpen){
    lis[4].style.backgroundColor="red";
   }
   
}

sidbut.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSidebar();
});

document.body.addEventListener("click", (event) => {
    if (isOpen && !sidebar.contains(event.target)) {
        toggleSidebar();
    }
});