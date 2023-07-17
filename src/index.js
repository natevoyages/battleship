import { player } from "./player";
import { createMap, addListeners, affectUserMap, domPlacement } from './dom';
const computer = player();
const playerOne = player();
createMap('map-user', 'player');
playerOne.board.placeShip(5,'[0,5]', true, 'carrier');
playerOne.board.placeShip(4,'[1,5]', true, 'battleship');
playerOne.board.placeShip(3,'[2,5]', true, 'destoyer');
playerOne.board.placeShip(3,'[3,5]', true, 'subamarine');
playerOne.board.placeShip(2,'[7,5]', true, 'patrol boat');
domPlacement(5);
if(playerOne.board.ships.size == 5){
document.getElementById('wrapper-enemy').style.display = 'block';
createMap('map-enemy', 'enemy');
computer.board.placeShip(5,'[0,5]', true, 'carrier');
computer.board.placeShip(4,'[1,5]', true, 'battleship');
computer.board.placeShip(3,'[2,5]', true, 'destoyer');
computer.board.placeShip(3,'[3,5]', true, 'subamarine');
computer.board.placeShip(2,'[4,5]', true, 'patrol boat');
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
}
console.log(playerOne.board.coordinates);
