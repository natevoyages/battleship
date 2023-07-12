import { player } from "./player";
import { createMap, addListeners, affectUserMap } from './dom';
const computer = player();
const playerOne = player();
let winner = false;
createMap('map-enemy', 'enemy');
createMap('map-user', 'player');
playerOne.board.placeShip(5,'[0,5]', true, 'destoyer');
playerOne.board.placeShip(5,'[1,5]', true, 'destoyer');
playerOne.board.placeShip(5,'[2,5]', true, 'destoyer');
playerOne.board.placeShip(5,'[3,5]', true, 'destoyer');


computer.board.placeShip(5,'[0,5]', true, 'steve');
computer.board.placeShip(5,'[1,5]', true, 'joe');
computer.board.placeShip(5,'[2,5]', true, 'naur');
computer.board.placeShip(5,'[3,5]', true, 'hmm');
computer.board.placeShip(5,'[4,5]', true, 'destoyer');


addListeners(computer.board);

console.log(playerOne.board);

const observer = new MutationObserver(()=> {
    let computerAttack = computer.computerAI();
    computer.attack(playerOne.board,computerAttack);
    affectUserMap(computerAttack, playerOne.board);
})

for(let i = 0; i < 10; i++){
    observer.observe(document.querySelector(`#map-enemy > .row-${i}`), { subtree: true, attributes: true });
}
