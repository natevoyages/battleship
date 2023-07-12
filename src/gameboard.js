import { createBattleShip } from "./battleship";
const gameboard = function() {
    const createGameboard = function(){
        let gameSpaces = new Map();
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                gameSpaces.set(JSON.stringify([i,j]), {attacked: false, occupied: false,  ship: null})
            }
        }
    return gameSpaces;
    }
    const placeShip = function(length,location, isVert, name){
        let start = JSON.parse(location);
        let holder = JSON.parse(location);
        let endPos = JSON.parse(location);
        let ship = createBattleShip(length);
        endPos[1] = ship.length - 1  + start[1];
        endPos[0] = ship.length - 1 + start[0];
        if (isVert && endPos[1] < 10){
            ships.set(name, ship);
            coordinates.get(JSON.stringify(holder)).occupied = true;
            coordinates.get(JSON.stringify(holder)).name = name;
            for(let i = 1; i < length; i++){
                holder[1]++;
                coordinates.get(JSON.stringify(holder)).occupied = true;
                coordinates.get(JSON.stringify(holder)).name = name;
            }
        }
        else if (!isVert && endPos[0] < 10){
            ships.set(name, ship);
            coordinates.get(JSON.stringify(holder)).occupied = true;
            coordinates.get(JSON.stringify(holder)).name = name;
            for(let i = 1; i < length; i++){
                holder[0]++;
                coordinates.get(JSON.stringify(holder)).occupied = true;
                coordinates.get(JSON.stringify(holder)).name = name;
            }
        }
        else{
            //this.placeShip();
        }
    }
    const receiveAttack = function(aim){

        if(coordinates.get(aim).occupied == true && coordinates.get(aim).attacked == false){
            coordinates.get(aim).attacked = true;
            let name = coordinates.get(aim).name;
            ships.get(name).hit();
            if (ships.get(name).isSunk()){
                ships.delete(name);
            }
        }
        else if(coordinates.get(aim).occupied == false && coordinates.get(aim).attacked == false){
            coordinates.get(aim).attacked = true;
        }
    };
    let coordinates = createGameboard();
    let ships = new Map();
    let shipCount = function() {
        return ships.size;
    };
    
    return {coordinates, placeShip, shipCount, ships, receiveAttack} ;
}
export {gameboard};