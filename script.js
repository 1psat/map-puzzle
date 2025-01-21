let timerInterval;
let time = 0;

function startGame() {
    resetTimer();
    const difficulty = document.getElementById("difficulty").value;
    const size = parseInt(difficulty);
    const puzzleContainer = document.getElementById("puzzle-container");

    puzzleContainer.innerHTML = "";
    puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    puzzleContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const pieces = [];
    for (let i = 0; i < size * size; i++) {
        pieces.push(i + 1);
    }
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach((number) => {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.textContent = number === size * size ? "" : number;
        piece.addEventListener("click", () => movePiece(piece, size));
        puzzleContainer.appendChild(piece);
    });

    startTimer();
}

function movePiece(piece, size) {
    const emptyPiece = [...document.querySelectorAll(".puzzle-piece")].find(
        (p) => p.textContent === ""
    );

    const pieceIndex = [...piece.parentNode.children].indexOf(piece);
    const emptyIndex = [...piece.parentNode.children].indexOf(emptyPiece);

    const distance = Math.abs(pieceIndex - emptyIndex);
    if (distance === 1 || distance === size) {
        emptyPiece.textContent = piece.textContent;
        piece.textContent = "";
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        const minutes = String(Math.floor(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        document.getElementById("timer").textContent = `Время: ${minutes}:${seconds}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 0;
    document.getElementById("timer").textContent = "Время: 00:00";
}
