let boxes = document.querySelectorAll(".box");
let reserBtn = document.querySelector("#reset-btn");
let turnO = true;
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");
let hide = document.querySelector(".hide");
let newBtn = document.querySelector("#new-btn");
let count = 0;

let winnerPatterns = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box is clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winnerPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos1Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newBtn.addEventListener("click", resetGame);
reserBtn.addEventListener("click", resetGame);