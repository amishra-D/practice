const colors = ["#EB7A53", "#F7D44C", "#A8D672", "#98B7DB"];
const container = document.querySelector('.grid-container');
const leng = document.querySelector(".len");
const add = document.querySelector("#ad");
const popup = document.getElementById("pop");
const close = document.getElementById("close");
const del = document.getElementById("delete");
const pin = document.getElementById("pin");
const open = document.getElementById("open");
const mar = document.querySelector(".IMP");
const al = document.querySelector(".All");
const le = document.querySelector(".len");
const sidebar = document.querySelector("#side");
function popvis(val){
    popup.style.visibility = val ? "visible":"hidden";
}

al.addEventListener("click",function(){
    window.location='notes.html';
});
mar.addEventListener("click",function(){
    window.location='marked.html';
});
al.style.backgroundColor="white";
al.style.color="black";
le.style.opacity="1";
le.style.backgroundColor="white";
le.style.color="black";
le.style.border="1px solid black";
if (container) {
    container.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    leng.textContent = notes.length;

    if (notes.length == 0) {
        container.style.display = 'flex';
        container.style.width = "100%";
        container.textContent = 'NO NOTES ADDED YET';
        container.style.color = "white";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        container.style.fontFamily = 'Franklin Gothic, sans serif';
        container.style.fontSize = '40px';
    }

    notes.forEach((note, index) => {
        let newItem = document.createElement('div');
        newItem.classList.add('grid-item');

        let flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        let titleContainer = document.createElement('div');
        titleContainer.classList.add('toit');
        titleContainer.textContent = note.title;

        let textContainer = document.createElement('div');
        textContainer.classList.add('toxt');
        textContainer.textContent = note.text;

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
            localStorage.setItem("selectedNote", JSON.stringify(note));
            window.location.href = "addnote.html";
        });
        open.addEventListener("click", function () {
            localStorage.setItem("selectedNote", JSON.stringify(note));
            window.location.href = "addnote.html";
        });
        buttonContainer.addEventListener("click", function (event) {
            event.stopPropagation();
            popvis(true);
            

            del.addEventListener("click", function () {
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                let storednotes = JSON.parse(localStorage.getItem("storednotes")) || [];
                storednotes = storednotes.filter(storedNote => storedNote.title !== note.title || storedNote.text !== note.text);
                localStorage.setItem("storednotes", JSON.stringify(storednotes));
                window.location.reload();
            });

            pin.addEventListener("click", function () {
                let storednotes = JSON.parse(localStorage.getItem("storednotes")) || [];
                let alreadyPinned = storednotes.some(storedNote => storedNote.title === note.title && storedNote.text === note.text);
                if(alreadyPinned){
                   alert("The note is already pinned")
                }if (!alreadyPinned) {
                    storednotes.push(note);
                    localStorage.setItem("storednotes", JSON.stringify(storednotes));
                }
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