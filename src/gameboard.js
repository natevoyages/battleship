import { createBattleShip } from "./battleship";
const gameboard = function() {
    const createGameboard = function(){
        let gameSpaces = new Map();
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                gameSpaces.set(JSON.stringify([i,j]), {attacked: false, occupied: false })
            }
        }
    return gameSpaces;
    }
    const placeShip = function(length,location, isVert, name){
        let start = JSON.parse(location);
        let holder = JSON.parse(location);
        let endPos = JSON.parse(location);
        let ship = createBattleShip(length);
        endPos[1] = ship.length  + start[1];
        endPos[0] = ship.length + start[0];
        if (isVert && endPos[1] < 10){
            this.ships.set(name, ship);
            this.coordinates.get(JSON.stringify(holder)).occupied = true;
            for(let i = 1; i < length; i++){
                holder[1]++;
                this.coordinates.get(JSON.stringify(holder)).occupied = true;
            }
        }
        else if (!isVert && endPos[0] < 10){
            this.ships.set(name, ship);
            this.coordinates.get(JSON.stringify(holder)).occupied = true;
            for(let i = 1; i < length; i++){
                holder[0]++;
                this.coordinates.get(JSON.stringify(holder)).occupied = true;
            }
        }
        else{
            //this.placeShip();
        }
    }
    let coordinates = createGameboard();
    let ships = new Map();
    let shipCount = function() {
        return this.ships.size;
    }
    
    return {coordinates, placeShip, shipCount, ships} ;
}
export {gameboard};