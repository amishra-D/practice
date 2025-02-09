let tex = document.getElementById("textInput");
let tit = document.getElementById("titleInput");
let wor = document.getElementById("words");
function words(){
    let st = tex.value.trim();
    let words = st.split(/\s+/);
    let count = st.length > 0 ? words.length : 0;
    wor.textContent = `${count} words`;
}
tex.addEventListener("input", () => {
  words();
});

document.addEventListener("DOMContentLoaded", function () {
  let selectedNote = JSON.parse(localStorage.getItem("selectedNote"));
    if (selectedNote) {
        tit.value = selectedNote.title;
        tex.value = selectedNote.text;
        words();
    }

let save = document.getElementById("save");
save.addEventListener("click", function () {
    if (tex.value.trim() || tit.value.trim()) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        let newnote = {
            title: tit.value.trim(),
            text: tex.value.trim()
        };
        let index = notes.findIndex(n => n.title === selectedNote?.title && n.text === selectedNote?.text);
        if (index !== -1) {
            notes[index] = newnote;
        } else {
            notes.push(newnote);
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(notes);
        window.location.href='notes.html';
    } else {
        alert("Please fill in the title and text fields");
    }
});
});