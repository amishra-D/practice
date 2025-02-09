const colors = ["#EB7A53", "#F7D44C", "#A8D672", "#98B7DB"];
const container = document.querySelector('.grid-container');
const leng = document.querySelector(".len");
const add=document.querySelector("#ad");
if (container) {
    container.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    leng.textContent = notes.length;

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
    });
    
} else {
    console.error("Grid container not found!");
}
add.addEventListener("click",function(){
  localStorage.setItem("selectedNote",null);
  window.location.href = "addnote.html";
})
