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
const sidbut = document.querySelector("#side-toggle-btn");
const sidebar = document.querySelector("#side");
const page = document.querySelector(".page");
const lis = document.querySelectorAll("li");

let isOpen = false;
let bol=false;
function toggleSidebar() {
    isOpen = !isOpen;
    sidebar.classList.toggle("open", isOpen);
    page.classList.toggle("shifted", isOpen);
    sidbut.classList.toggle("hidden", isOpen);

    const fileMap = {
        "notes.html": 1,
        "lists.html": 2,
        "calculator.html": 3,
        "whiteboard.html": 4
    };

    lis.forEach(li => li.style.backgroundColor = "");
    if (fileMap[window.location.pathname.split('/').pop()]) {
        lis[fileMap[window.location.pathname.split('/').pop()]].style.backgroundColor = "red";
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

function togglePopup(visible) {
    popup.style.visibility = visible ? "visible" : "hidden";
}

document.body.addEventListener("click", () => togglePopup(false));
close.addEventListener("click", () => togglePopup(false));

al.addEventListener("click", () => window.location = 'notes.html');
mar.addEventListener("click", () => window.location = 'marked.html');

[al, le].forEach(el => {
    el.style.backgroundColor = "white";
    el.style.color = "black";
    el.style.border = "1px solid black";
    el.style.opacity = "1";
});

if (container) {
    container.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    leng.textContent = notes.length;

    if (!notes.length) {
        Object.assign(container.style, {
            display: 'flex',
            width: "100%",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: 'Franklin Gothic, sans-serif',
            fontSize: '40px'
        });
        container.textContent = 'NO NOTES ADDED YET';
    }

    notes.forEach((note, index) => createNoteElement(note, index));
} 

function createNoteElement(note, index) {
    

    let newItem = document.createElement('div');
    newItem.classList.add('grid-item');
    if (index === 0) {
        newItem.classList.add('large-grid-item');
    }
    newItem.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    newItem.style.color = "white";

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

    contentContainer.append(titleContainer, textContainer);

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let but = document.createElement('img');
    but.src = "assets/more_vert.png";
    but.classList.add('btn');
    buttonContainer.appendChild(but);

    flexContainer.append(contentContainer, buttonContainer);
    newItem.appendChild(flexContainer);
    container.appendChild(newItem);

    newItem.addEventListener("click", () => {
        localStorage.setItem("selectedNote", JSON.stringify(note));
        window.location.href = "addnote.html";
    });

    buttonContainer.addEventListener("click", (event) => {
        event.stopPropagation();
        togglePopup(true);

        del.onclick = () => deleteNote(index);
        pin.onclick = () => pinNote(note);
    });

    open.addEventListener("click", () => {
        localStorage.setItem("selectedNote", JSON.stringify(note));
        window.location.href = "addnote.html";
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let storedNotes = JSON.parse(localStorage.getItem("storednotes")) || [];

    let removedNote = notes.splice(index, 1)[0];
    storedNotes = storedNotes.filter(n => n.title !== removedNote.title || n.text !== removedNote.text);

    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("storednotes", JSON.stringify(storedNotes));
    window.location.reload();
}

function pinNote(note) {
    let storedNotes = JSON.parse(localStorage.getItem("storednotes")) || [];
    if (storedNotes.some(n => n.title === note.title && n.text === note.text)) {
        alert("The note is already pinned");
        return;
    }
    storedNotes.push(note);
    localStorage.setItem("storednotes", JSON.stringify(storedNotes));
}

add.addEventListener("click", () => {
    localStorage.setItem("selectedNote", null);
    window.location.href = "addnote.html";
});
