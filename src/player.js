import { gameboard } from "./gameboard";
const player = function() {
    let board = gameboard();
    let attack = function(enemyBoard, coordinates){
        if (enemyBoard.coordinates.get(coordinates) != undefined){
            enemyBoard.receiveAttack(coordinates);
        }
    };
    return {board, attack};
}

export{player};