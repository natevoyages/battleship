import { gameboard } from "./gameboard";
const player = function() {
    let board = gameboard();
    let attack = function(enemyBoard, coordinates){
        if (enemyBoard.coordinates.get(coordinates) != undefined){
            enemyBoard.receiveAttack(coordinates);
        }
    };
    const computerAI = function(){
        let randomXY = [];
        let randNumOne = Math.floor(Math.random()*10); 
        let randNumtwo = Math.floor(Math.random()*10); 
        randomXY.push(randNumOne,randNumtwo);
        return JSON.stringify(randomXY);
    }
    return {board, attack, computerAI};
}

export{player};