// things to do:
// add bounce off of finish line 
// make board position display function
// make square positions


const laddersStart = [2, 7, 8, 15, 21, 28, 36, 51, 71, 78, 87];
const laddersEnd = [38, 14, 31, 26, 42, 84, 44, 67, 91, 98, 94];
const snakesStart = [99, 95, 92, 89, 74, 64, 62, 49, 46, 16];
const snakesEnd = [80, 75, 88, 68, 53, 60, 19, 11, 25, 6];

const boardSquare = [];

let die1;
let die2;
let gameCounter = 0;
let turnCounter = 0;
let dieString;

// function setBoardSquare() {
//     boardSquare.push({x: ,y:})
// }

class SnakesLadders {
    firstTurn() { 
        this.positionP1 = 0;
        this.positionP2 = 0;
    }

    activePlayer() {
        if(this.player === 1) {
            this.player = 2;
        }
        else {
            this.player = 1;
        }
    }
    
    roll() {
        this.dieRoll = this.die1 + this.die2;
        dieString = '';
        dieString += `<div id='dieDiv'>`
        dieString +=    `<p id='rollPar'>Current Roll:</p>`
        dieString +=    `<img src='dice${this.die1}.png' class='dice'>`
        dieString +=    `<img src='dice${this.die2}.png' class='dice'>`
        dieString += `</div>`
        writeToDom('dies', dieString);
    }

    player1() { 
        this.positionP1 = this.positionP1 + this.dieRoll;
        for(let i = 0; i < laddersStart.length; i++) {
            if(this.positionP1 === laddersStart[i]) {
                this.positionP1 = laddersEnd[i];
            }
        }
        for(let i = 0; i < snakesStart.length; i++) {
            if(this.positionP1 === snakesStart[i]) {
                this.positionP1 = snakesEnd[i];
            }
        }
    }
    player2() {
        this.positionP2 = this.positionP2 + this.dieRoll;
        for(let i = 0; i < laddersStart.length; i++) {
            if(this.positionP2 === laddersStart[i]) {
                this.positionP2 = laddersEnd[i];
            }
        }
        for(let i = 0; i < snakesStart.length; i++) {
            if(this.positionP2 === snakesStart[i]) {
                this.positionP2 = snakesEnd[i];
            }
        }
    }
    play(die1, die2) {
        this.die1 = die1;
        this.die2 = die2;
        if(turnCounter === 1) {
            this.firstTurn();
        }
        if(this.positionP1 === 100 || this.positionP2 === 100) {
            alert('Game Over');
        }
        else {
            this.activePlayer();
            this.roll();
            if(this.player === 1) {
                if(this.positionP1 === 100) {
                    alert('Player 1 wins');
                }
                else {
                    this.player1();
                    alert('Player 1 is on square ' + this.positionP1);
                }
            }   
            else {
                if(this.positionP2 === 100) {
                    alert('Player 2 wins');
                }
                else {
                    this.player2();
                    alert('Player 2 is on square ' + this.positionP2);
                }
            }
        }        
    }  
}

function writeToDom(div, string) {
    document.getElementById(div).innerHTML = string;
}

function addToDom(div, string) {
    document.getElementById(div).innerHTML += string;
}

function newGame() {
    document.getElementById('newGame').addEventListener('click', function() {
        gameCounter++;
        turnCounter = 0;
        window['game' + gameCounter] = new SnakesLadders();
        writeToDom('mainDiv', `<p>You are playing game ${gameCounter}</p>`);
        if(gameCounter === 1) {
            addToDom('boardDiv', `<img src='boardMark1.png' id='marker1'>`);
            addToDom('boardDiv', `<img src='boardMark2.png' id='marker2'>`);
        }
    })
}

function newRoll(game) {
    turnCounter++;
    die1 = (Math.floor(Math.random() * 6) + 1);
    die2 = (Math.floor(Math.random() * 6) + 1);
    game.play(die1, die2);
    writeToDom('turnDiv', `<p>You are on turn ${turnCounter}</p>`);
    if(window['game' + gameCounter].player === 1) {
        addToDom('turnDiv', `<p>Player 2 is up next.</p>`);
    }
    else {
        addToDom('turnDiv', `<p>Player 1 is up next.</p>`);
    }
}

function pressedPlay() {
    document.getElementById('play').addEventListener('click', function() {
        newRoll((window['game' + gameCounter]));
    });
}

newGame();
pressedPlay();

// ladders:
// 2 - 38
// 7 - 14
// 8 - 31
// 15 - 26
// 21 - 42
// 28 - 84
// 36 - 44
// 51 - 67
// 71 - 91
// 78 - 98
// 87 - 94

// snakes:
// 99 - 80
// 95 - 75
// 92 - 88
// 89 - 68
// 74 - 53
// 64 - 60
// 62 - 19
// 49 - 11
// 46 - 25
// 16 - 6

