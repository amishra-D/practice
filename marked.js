const colors = ["#EB7A53", "#F7D44C", "#A8D672", "#98B7DB"];
const container = document.querySelector('.grid-container');
const leng = document.querySelector(".len");
const add = document.querySelector("#ad");
const popup = document.getElementById("pop");
const close = document.getElementById("close");
const del = document.getElementById("delete");
const unpin = document.getElementById("unpin");
const open = document.getElementById("open");
function popvis(val){
    popup.style.visibility = val ? "visible":"hidden";
}
const mar = document.querySelector(".IMP");
const al = document.querySelector(".All");
const le = document.querySelector(".len");
al.addEventListener("click",function(){
    window.location='notes.html';
});
mar.addEventListener("click",function(){
    window.location='marked.html';
});
mar.style.backgroundColor="white";
    mar.style.color="black";
if (container) {
    container.innerHTML = "";
    let storednotes= JSON.parse(localStorage.getItem("storednotes")) || [];
    leng.textContent = storednotes.length;

    if (storednotes.length == 0) {
        container.style.display = 'flex';
        container.style.width = "100%";
        container.textContent = 'NO NOTES ADDED YET';
        container.style.color = "white";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        container.style.fontFamily = 'Franklin Gothic, sans serif';
        container.style.fontSize = '40px';
    }

    storednotes.forEach((storednote, storedindex) => {
        let newItem = document.createElement('div');
        newItem.classList.add('grid-item');

        let flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        let titleContainer = document.createElement('div');
        titleContainer.classList.add('toit');
        titleContainer.textContent = storednote.title;

        let textContainer = document.createElement('div');
        textContainer.classList.add('toxt');
        textContainer.textContent = storednote.text;

        contentContainer.appendChild(titleContainer);
        contentContainer.appendChild(textContainer);

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
            localStorage.setItem("selectedNote", JSON.stringify(storednote));
            window.location.href = "addnote.html";
        });
        open.addEventListener("click", function () {
            localStorage.setItem("selectedNote", JSON.stringify(storednote));
            window.location.href = "addnote.html";
        });
        buttonContainer.addEventListener("click", function (event) {
            event.stopPropagation();
            popvis(true);
            

            del.addEventListener("click", function () {
                storednotes.splice(storedindex, 1);
                localStorage.setItem("storednotes", JSON.stringify(storednotes));
                let notes = JSON.parse(localStorage.getItem("notes")) || [];
                notes=notes.filter(Note =>Note.title !== storednote.title || Note.text !== storednote.text);
                localStorage.setItem("notes", JSON.stringify(notes));
                window.location.reload();
            });

            unpin.addEventListener("click", function () {
                storednotes.splice(storedindex, 1);
                localStorage.setItem("storednotes", JSON.stringify(storednotes));
                window.location.reload();
            });
        });
    });
document.body.addEventListener("click",()=>{
    popvis(false);
});
    close.addEventListener("click", (e) => {
        popvis(false);
    });

    console.log(localStorage.getItem("notes"));
    console.log(localStorage.getItem("storednotes"));
} else {
    console.error("Grid container not found!");
}
add.addEventListener("click", function () {
    localStorage.setItem("selectedNote", null);
    window.location.href = "addnote.html";
});