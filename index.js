const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");
let board = ["","","","","","","","",""];
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [2,5,8],
];
let currentplayer = "X";
let gameisrunning = false;

initializeGame();


function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click" , cellClicked));
    restartButton.addEventListener("click" , restartGame);
    statusText.textContent = `${currentplayer}'s turn`;
    gameisrunning= true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellindex");
    if(board[cellIndex] != "" || !gameisrunning){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    board[index] = currentplayer;
    cell.textContent = currentplayer;
}

function changePlayer(){
    currentplayer = currentplayer === "X" ? "O" : "X";
    statusText.textContent = `${currentplayer}'s turn`;
    
}

function checkWinner(){
    let playerwon = false;

    for(i= 0; i< winConditions.length; i++){    //go through all the conditions on the board
        const thiscondition = winConditions[i];
        const firstCell = board[thiscondition[0]];
        const secondCell = board[thiscondition[1]];
        const thirdCell = board[thiscondition[2]];

        if(firstCell == "" || secondCell == ""|| thirdCell == ""){  //check for empty spots 
            continue;
        }
        if(firstCell == secondCell && secondCell == thirdCell){  //check for win
            playerwon= true;
            break;
        }
    }

    if(playerwon){
        statusText.textContent = `${currentplayer} won!`;   //if won
        gameisrunning = false;
    }else if(!board.includes("")){                  //board full. no winner
        statusText.textContent = `tie!`;
        gameisrunning = false;
    }else{                                                  //game not finnished
        changePlayer();
    }
}
function restartGame(){
    board = ["","","","","","","","",""];
    currentplayer = "X";
    gameisrunning = true;
    statusText.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell =>  cell.textContent="");
    
}