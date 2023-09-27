const tiles = Array.from(document.querySelectorAll(".tiles"));
const displayPlayer = document.getElementById("winner");
const restart = document.getElementById('restart');
let player = 'X';
let end = false;
let board = ['', '', '', '', '', '', '', '', ''];
let moves = 0;

/* Board
[0] [1] [2]
[3] [4] [5]
[6] [7] [8]
*/
const winCon = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal tl br
    [2, 4, 6] // diagonal tr bl
];

restart.style.display = "None";

tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => place(tile, index));
});

restart.addEventListener('click', () => newGame());


const place = (tile, index) => {
    if (validMove(tile) && !end) {
        moves++;
        changeBoard(tile, index);
        changePlayer();
        over();
    }
}

function validMove(tile) {
    if (tile.firstChild.textContent === '') {
        return true;
    }
    else {
        return false;
    }
}

const over = () => {
    for (i = 0; i < winCon.length; ++i) {
        if (('X' == board[winCon[i][0]] && 'X' == board[winCon[i][1]] && 'X' == board[winCon[i][2]]) ||
           ('O' == board[winCon[i][0]] && 'O' == board[winCon[i][1]] && 'O' == board[winCon[i][2]])) {
            end = true;
            printWinner(board[winCon[i][0]]);
            break;
        }
    }
    console.log(moves);
    if (moves == 9) {
        end = true;
        printWinner("");
    }
}

function changeBoard(tile, index) {
    tile.firstChild.textContent = player;
    board[index] = player;
}

function changePlayer() {
    player = player === 'O' ? 'X' : 'O';
    displayPlayer.textContent = "Player " + player + "'s Turn";
}

function printWinner(winner) {
    if (winner) {
        console.log('here');
        displayPlayer.textContent = "Player " + winner + " Wins";
    }
    else {
        displayPlayer.textContent = "Tie Game";
    }
    restart.style.display = "inline";
}

function newGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    end = false;
    moves = 0;
    tiles.forEach((tiles) => tiles.firstChild.textContent = null);
    player = 'X';
    restart.style.display = "None";
    displayPlayer.textContent = "Player X's Turn";
}