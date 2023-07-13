const createMap = function(idName, playerType){
    const map = document.getElementById(idName);
    createCoordinates(map, playerType);
}




const createCoordinates = function(mapDom, playerType){
    for(let j = 9; j > -1; j--){
        let row = document.createElement('div');
        row.setAttribute('class', `row-${j}`);
        row.style.height = '10%';
        row.style.display = 'flex';
        if (j !== 0){
            row.style.borderBottom = '1px solid black'
        }
        mapDom.append(row);

        for(let i = 0; i < 10; i++){
            let coordinate = document.createElement('div');
            coordinate.setAttribute('class', `x${i}-${j}`);
            coordinate.classList.add(playerType);
            coordinate.style.flexGrow = '1';
            if (i !== 9){
                coordinate.style.borderRight = '1px solid black'
            }
            row.append(coordinate);
        }
    }

}
const attack = function(event, board, observer){
    let string = event.target.className;
    let newString = string.split(' ');
    newString = newString.join('.');
    console.log(newString)
    let x = string.slice(1,2);
    let y = string.slice(3,4);
    let aim = `[${x},${y}]`;
    board.receiveAttack(aim);
    console.log(board.coordinates.get(aim).occupied)
    console.log(board);
    if (board.coordinates.get(aim).occupied == true){
        document.querySelector(`.${newString}`).classList.add("hit");
        document.getElementById('message').innerText = 'Message: HIT';
        observer.disconnect();
    }
    else{
        for(let i = 0; i < 10; i++){
            observer.observe(document.querySelector(`#map-enemy > .row-${i}`), { subtree: true, attributes: true });
        }
        document.querySelector(`.${newString}`).classList.add("miss");
        document.getElementById('message').innerText = 'Message: MISS';
    }
}
const addListeners = function(board, observer){
    for(let i = 9; i > -1; i--){
        for(let j = 0; j < 10; j++){
            const xY = document.querySelector(`.x${i}-${j}.enemy`);
            xY.addEventListener('click',function eventHandler(event) {
                attack(event, board , observer);
                this.removeEventListener('click', eventHandler);
            });
        }
    }
}
const affectUserMap =  async function(arr, board){
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    document.querySelector('.blocker').style.display = 'block';
    await timeout(1500);
    let xY = arr.split('');
    let x = xY[1];
    console.log(x);
    let y = xY[3];
    const user = document.querySelector(`.x${x}-${y}.player`);
    document.getElementById('message').innerText = 'Message: Computer thinking...';
    await timeout(1000);

    if (board.coordinates.get(arr).occupied == true){
        user.classList.add("hit");
        document.getElementById('message').innerText = 'Message: Computer HIT';
    }
    else{
        user.classList.add("miss");
        document.getElementById('message').innerText = 'Message: Computer MISS';
    }
    document.querySelector('.blocker').style.display = 'none';
}

export{createMap, addListeners, affectUserMap};
