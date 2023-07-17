import { player } from "./player";
import { createMap, addListeners, affectUserMap, domPlacedShips } from './dom';
const computer = player();
const playerOne = player();
createMap('map-user', 'player');
playerOne.board.placeShip(5,prompt('carrier: enter coorintates from 0-9 eg:[x,y]'), true, 'carrier');
playerOne.board.placeShip(4,prompt('battleship: enter coorintates from 0-9 eg:[x,y]'), true, 'battleship');
playerOne.board.placeShip(3,prompt('destoyer: enter coorintates from 0-9 eg:[x,y]'), true, 'destoyer');
playerOne.board.placeShip(3,prompt('subamarine: enter coorintates from 0-9 eg:[x,y]'), true, 'subamarine');
playerOne.board.placeShip(2,prompt('patrol boat: enter coorintates from 0-9 eg:[x,y]'), true, 'patrol boat');
domPlacedShips(playerOne.board);
document.getElementById('wrapper-enemy').style.display = 'block';
createMap('map-enemy', 'enemy');
computer.board.placeShip(5,`[${0},${Math.floor(Math.random()*6)}]`, true, 'carrier');
computer.board.placeShip(4,`[${1 + Math.floor(Math.random()*3)},${Math.floor(Math.random()*9)}]`, true, 'battleship');
computer.board.placeShip(3,`[${5},${Math.floor(Math.random()*8)}]`, true, 'destoyer');
computer.board.placeShip(3,`[${6 + Math.floor(Math.random()*3)},${Math.floor(Math.random()*8)}]`, true, 'subamarine');
computer.board.placeShip(2,`[${4},${Math.floor(Math.random()*9)}]`, true, 'patrol boat');
console.log(computer.computerMoves);

const observer = new MutationObserver(()=> {
    if(playerOne.board.shipCount() == 0){
        console.log('DONE');
    }
    else{
    let computerAttack = computer.computerAI;
    computer.attack(playerOne.board,computerAttack);
    affectUserMap(computerAttack, playerOne.board);
    }
});

for(let i = 0; i < 10; i++){
    observer.observe(document.querySelector(`#map-enemy > .row-${i}`), { subtree: true, attributes: true });
}


addListeners(computer.board, playerOne.board, observer);

console.log(playerOne.board.coordinates);