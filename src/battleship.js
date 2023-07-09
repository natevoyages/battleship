const createBattleShip = function(length){
  let hits = 0;
  const hit = function(){
    this.hits++;
  };
  const isSunk = function(){
    if(this.hits == this.length){
      return true;
    }
    else{
      return false;
    }
  };
  return {hit,isSunk, length, hits}
};


export {createBattleShip};