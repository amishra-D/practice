const colors = ["#EB7A53", "#F7D44C", "#A8D672", "#98B7DB"];
const container = document.querySelector('.grid-container');
const add = document.querySelector("#ad");
const popup = document.getElementById("pop");
const close = document.getElementById("close");
const del = document.getElementById("delete");
const pin = document.getElementById("pin");
const open = document.getElementById("open");

const le = document.querySelector(".len");
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
function popvis(val){
    popup.style.visibility = val ? "visible":"hidden";
}
if (container) {
    container.innerHTML = "";
    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    console.log(lists);
    if (lists.length == 0) {
        container.style.display = 'flex';
        container.style.width = "100%";
        container.textContent = 'NO LISTS ADDED YET';
        container.style.color = "white";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        container.style.fontFamily = 'Franklin Gothic, sans serif';
        container.style.fontSize = '40px';
    }

    lists.forEach((list, index) => {
        let newItem = document.createElement('div');
        newItem.classList.add('grid-item');
if(index===0){
    newItem.classList.add("large-grid-item");
}
        let flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        let titleContainer = document.createElement('div');
        titleContainer.classList.add('toit');
        titleContainer.textContent = list.title;

        let textContainer = document.createElement('div');
        textContainer.classList.add('toxt');
        textContainer.textContent = list.todo;
    

        let done = document.createElement('div');
        done.classList.add('toxt');
        done.textContent = list.done;
        done.style.color="black";
        done.style.marginTop="8px";

        contentContainer.appendChild(titleContainer);
        contentContainer.appendChild(textContainer);
        contentContainer.appendChild(done);

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        let but = document.createElement('img');
        but.src = "assets/more_vert.png";
        but.classList.add('btn');

        buttonContainer.appendChild(but);

        flexContainer.appendChild(contentContainer);
        flexContainer.appendChild(buttonContainer);

        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        newItem.style.backgroundColor = randomColor;
        newItem.style.color = "white";

        newItem.appendChild(flexContainer);
        container.appendChild(newItem);
        newItem.addEventListener("click", function () {
            localStorage.setItem("selectedlist", JSON.stringify(list));
            window.location.href = "addlist.html";
        });
        open.addEventListener("click", function () {
            localStorage.setItem("selectedlist", JSON.stringify(list));
            window.location.href = "addlist.html";
        });
        buttonContainer.addEventListener("click", function (event) {
            event.stopPropagation();
            popvis(true);
            

            del.addEventListener("click", function () {
                lists.splice(index, 1);
                localStorage.setItem("lists", JSON.stringify(lists));
                let storedlists = JSON.parse(localStorage.getItem("storedlists")) || [];
                storedlists = storedlists.filter(storedlist => storedlist.title !== list.title || storedlist.todo !== list.todo || storedlist.done!==list.done);
                localStorage.setItem("storedlists", JSON.stringify(storedlists));
                window.location.reload();
            });
        });
    });
document.body.addEventListener("click",(event)=>{
    popvis(false);
    
});
    close.addEventListener("click", (e) => {
        popvis(false);
    });

    console.log(localStorage.getItem("lists"));
    console.log(localStorage.getItem("storedlists"));
} else {
    console.error("Grid container not found!");
}
add.addEventListener("click", function () {
    localStorage.setItem("selectedlist", null);
    window.location.href = "addlist.html";
});
