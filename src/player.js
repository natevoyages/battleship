import { gameboard } from "./gameboard";
const player = function() {
    let board = gameboard();
    let attack = function(enemyBoard, coordinates){
        if (enemyBoard.coordinates.get(coordinates) != undefined){
            enemyBoard.receiveAttack(coordinates);
        }
    };
    const computerAI = function(x = null, y = null, streak = null){
        if(streak != null){
            let array = `[${x},${y}]`;
            let index = computerMoves.indexOf(array);
            console.log('index', index);
            if(index == -1){
                return computerAI();
            }
            computerMoves.splice(index,1);
            console.log('SPLICED!');
            console.log(array);
            console.log(computerMoves.length)
            return array;
            
        }
        else if(streak == null){
            let length = computerMoves.length;
            console.log('lentgh',length)
            let randNum = Math.floor(Math.random()*length); 
            let array = computerMoves[randNum];
            console.log(array);
            computerMoves.splice(randNum, 1);
            console.log('SPLICED!');
            console.log('moves left:',computerMoves.length)
            return array;
        }
    };
    const createMoves = function(){
        let arr = [];
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let holder = [];
                holder.push(i,j);
                arr.push(JSON.stringify(holder));
            }
        }
        return arr;
    };
    const computerMoves = createMoves();

    return {board, attack, computerAI, computerMoves};
}

export{player};