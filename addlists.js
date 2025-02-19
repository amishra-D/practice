const titl = document.querySelector("#titleInput");
let flexb = document.getElementById("flexb");
let sav = document.getElementById("save");
let del = document.getElementById("delete");
const ad = document.getElementById("addi");
const doneContainer = document.getElementById("done"); 
doneContainer.innerHTML = "";
document.addEventListener("DOMContentLoaded", function () {
    let selectedList = JSON.parse(localStorage.getItem("selectedlist"));

    if (selectedList) {
        document.getElementById("titleInput").value = selectedList.title;

        selectedList.todo.forEach(text => {
            createTodoItem(text);
        });

        selectedList.done.forEach(text => {
            createDoneItem(text);
        });
    }
});

ad.addEventListener("click", () => {
    createTodoItem("");
});

function createTodoItem(text) {
    let newLi = document.createElement("textarea");
    newLi.value = text;
    newLi.placeholder = "Type your text here...";
    newLi.classList.add("listInput");

    let buto = document.createElement("button");
    buto.classList.add("tickButton");

    let cro = createCrossButton();

    let on = document.createElement("div");
    on.classList.add("one");

    on.appendChild(buto);
    on.appendChild(newLi);
    on.appendChild(cro);
    flexb.appendChild(on);
}

function createDoneItem(text) {
    let doneItem = document.createElement("div");
    doneItem.classList.add("do");

    let newt = document.createElement("p");
    newt.classList.add("listdone");
    newt.textContent = text;

    let cdro = createCrossButton();

    doneItem.appendChild(newt);
    doneItem.appendChild(cdro);
    doneContainer.appendChild(doneItem);
}

function createCrossButton() {
    let cro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    cro.setAttribute("width", "20");
    cro.setAttribute("height", "20");
    cro.setAttribute("viewBox", "0 0 24 24");
    cro.setAttribute("fill", "white");
    cro.classList.add("cross");

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M6 6L18 18M6 18L18 6");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    cro.appendChild(path);
    return cro;
}

flexb.addEventListener("click", (event) => {
    if (event.target.classList.contains("tickButton")) {
        let parentDiv = event.target.parentElement;
        let textArea = parentDiv.querySelector("textarea");

        if (textArea && textArea.value.trim() !== "") {
            createDoneItem(textArea.value.trim());
            parentDiv.remove();
        }
    }

    if (event.target.classList.contains("cross")) {
        event.target.parentElement.remove();
    }
});

doneContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cross")) {
        e.target.parentElement.remove();
    }
});

sav.addEventListener("click", () => {
    let textAreas = document.querySelectorAll(".one .listInput");
    let doneAreas = document.querySelectorAll(".do .listdone");

    let to = Array.from(textAreas).map(textarea => textarea.value.trim()).filter(text => text !== "");
    let doneli = Array.from(doneAreas).map(donearea => donearea.textContent.trim()).filter(text => text !== "");

    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    let newlist = {
        title: titl.value.trim(),
        todo: to,
        done: doneli
    };

    let existingIndex = lists.findIndex(list => list.title === newlist.title);
    if (existingIndex !== -1) {
        lists[existingIndex] = newlist;
    } else {
        lists.push(newlist);
    }

    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("selectedlist", JSON.stringify(newlist));

    console.log(lists);
});
del.addEventListener("click", () => {
    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    let titleToDelete = titl.value.trim();
    let index = lists.findIndex(list => list.title === titleToDelete);
    
    if (index !== -1) {
        lists.splice(index, 1);
        localStorage.setItem("lists", JSON.stringify(lists));
        localStorage.removeItem("selectedlist");
        alert(`List has been deleted!`);

        titl.value = "";
        flexb.innerHTML = "";
        doneContainer.innerHTML = "";
    } else {
        window.location.href='lists.html';
    }
});
