let tog = false;
let isDrawingMode = false;
let isErasing = false;
let isTextMode = false; // ✅ Declare isTextMode

const togg = document.getElementById("toggle_freehand");
const mou = document.getElementById("features1_arrow");
const colorInput = document.getElementById("colorPicker");
const circle = document.querySelector(".circle");
const stroke = document.querySelector("#strokeWidth");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const penButton = document.getElementById("toggle_freehand_pen");
const highlighterButton = document.getElementById("toggle_freehand_highlighter");
const eraserButton = document.getElementById("toggle_freehand_eraser");
const clearButton = document.getElementById("clear_button");
const textButton = document.getElementById("features1_text");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

togg.style.display = "none";

// Update color preview
colorInput.addEventListener("input", function () {
    circle.style.backgroundColor = colorInput.value;
});

// Toggle menu
function toggle() {
    tog = !tog;
    togg.style.display = tog ? "flex" : "none";
}

// Enable text mode
textButton.addEventListener("click", () => {
    isTextMode = true;
    isDrawingMode = false;
    isErasing = false;
    document.body.style.cursor = "text";
});

// Enable drawing mode with optional reset for stroke and opacity
function enableDrawingMode(reset = false, tool = "pen") {
    isDrawingMode = true;
    isErasing = false;
    isTextMode = false;
    
    // Apply custom cursor
    if (tool === "pen") {
        document.body.style.cursor = "url('assets\pencil-148324_1280.png'), auto";
    } else if (tool === "highlighter") {
        document.body.style.cursor = "url('highlighter-cursor.png'), auto";
    }

    // Reset stroke width & opacity if switching from highlighter
    if (reset) {
        ctx.globalAlpha = 1; // Reset opacity
        ctx.lineWidth = stroke.value; // Reset stroke width
        highlighterButton.classList.remove("active"); // Remove active class from highlighter
    }
}

// Disable drawing mode when clicking outside
mou.addEventListener("click", () => {
    isDrawingMode = false;
    isTextMode = false;
    isErasing = false;
    document.body.style.cursor = "unset";
});

// Assign event listeners
penButton.addEventListener("click", () => enableDrawingMode(true, "pen")); // Pass 'true' to reset
highlighterButton.addEventListener("click", () => {
    enableDrawingMode(false, "highlighter");
    highlighterButton.classList.add("active");
});
eraserButton.addEventListener("click", () => {
    isErasing = true;
    isDrawingMode = true;
    isTextMode = false;
    document.body.style.cursor = "url('eraser-cursor.png'), auto"; // Custom eraser cursor
});

// Drawing events
let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

function startDrawing(event) {
    if (!isDrawingMode) return;
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (!isDrawing || !isDrawingMode) return;

    if (isErasing) {
        let eraserSize = stroke.value;
        ctx.clearRect(event.offsetX - eraserSize / 2, event.offsetY - eraserSize / 2, eraserSize, eraserSize);
    } else {
        ctx.lineTo(event.offsetX, event.offsetY);

        if (highlighterButton.classList.contains("active")) {
            ctx.strokeStyle = colorInput.value;
            ctx.globalAlpha = 0.02;
            ctx.lineWidth = 15;
        } else {
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colorInput.value;
            ctx.lineWidth = stroke.value;
        }

        ctx.lineCap = "round";
        ctx.stroke();
    }
}

function stopDrawing(){
    isDrawing = false;
    ctx.closePath();
}

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
