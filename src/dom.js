const createMap = function(idName, playerType){
    const map = document.getElementById(idName);
    createCoordinates(map, playerType);
}




const createCoordinates = function(mapDom, playerType){
    for(let j = 9; j > -1; j--){
        let row = document.createElement('div');
        row.setAttribute('class', `row-${j}`);
        row.style.height = '100%';
        row.style.display = 'flex';
        if (j !== 0){
            row.style.borderBottom = '1px solid black'
        }
        mapDom.append(row);

        for(let i = 0; i < 10; i++){
            let coordinate = document.createElement('div');
            coordinate.setAttribute('class', `x${i}-${j}`);
            coordinate.classList.add(playerType);
            coordinate.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            coordinate.addEventListener('drop', (event) => { // old code
                event.preventDefault();
                console.log('coordinate',event.dataTransfer.getData('text/html'));
                event.target.classList.add('user-occupied');

            });
            coordinate.style.flexGrow = '1';
            if (i !== 9){
                coordinate.style.borderRight = '1px solid black'
            }
            row.append(coordinate);
        }
    }

}
const attack = function(event, board, userBoard, observer){
    let string = event.target.className;
    let newString = string.split(' ');
    newString = newString.join('.');
    console.log(newString)
    let x = string.slice(1,2);
    let y = string.slice(3,4);
    let aim = `[${x},${y}]`;
    board.receiveAttack(aim);
    console.log(board.coordinates.get(aim).occupied)
    console.log(board.shipCount());
    if(board.shipCount() == 0){
        document.getElementById('message').innerText = 'Message: You WIN';
        if (board.coordinates.get(aim).occupied == true){
            document.querySelector(`.${newString}`).classList.add("hit");
            document.getElementById('message').innerText = 'Message: HIT';
            observer.disconnect();
            setTimeout(()=> document.getElementById('message').innerText = 'Message: You WIN', 2000);
            
        }
    }
    else if(userBoard.shipCount() == 0){
        document.getElementById('message').innerText = 'Message: computer WIN';
    }
    else if (board.coordinates.get(aim).occupied == true){
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
const addListeners = function(board, userBoard, observer){
    for(let i = 9; i > -1; i--){
        for(let j = 0; j < 10; j++){
            const xY = document.querySelector(`.x${i}-${j}.enemy`);
            xY.addEventListener('click',function eventHandler(event) {
                attack(event, board, userBoard, observer);
                this.removeEventListener('click', eventHandler);
            });
        }
    }
}
const affectUserMap = async function(aIFn, board, streak = null, direction = null, prev = null){
    let arr = null;
    if (prev !== null){
        arr = prev;
    }
    else{
        arr = aIFn();
    }
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    document.querySelector('.blocker').style.display = 'block';
    await timeout(1000); 
    let xY = arr.split('');
    let x = xY[1];
    let y = xY[3];
    if (streak == '+' && direction == 'v'){
        if(y != 9){
            y++;
            arr = aIFn(x, y, streak);
        }
        else{
            streak = null;
        }
    }
    else if (streak == '-' && direction == 'v'){
        if(y != 0){
            y--;
            arr = aIFn(x, y, streak);

        }
        else{
            streak = null;
        }
    }
    else if (streak == '+' && direction == 'h'){
        if(x != 9){
            x++;
            arr = aIFn(x, y, streak);
        }
        else{
            streak = null;
        }
    }
    else if (streak == '-' && direction == 'h'){
        if(x != 0){
            x--;
            arr = aIFn(x, y, streak);
        }
                else{
            streak = null;
        }
    }
    if (streak == null && direction != null){
        arr = aIFn();
    }
    xY = arr.split('');
    x = xY[1];
    y = xY[3];
    let aim = `[${x},${y}]`;
    const user = document.querySelector(`.x${x}-${y}.player`);
    document.getElementById('message').innerText = 'Message: Computer thinking...';
    await timeout(1000);
    
    if(board.shipCount() == 0){
        document.getElementById('message').innerText = 'Message: Computer WINS';
    }
    else if (board.coordinates.get(aim).occupied == true){
        prev = aim;
        user.classList.add("hit");
        document.getElementById('message').innerText = 'Message: Computer HIT';
        board.receiveAttack(aim);
        let result = Math.floor(Math.random()*10) % 2;
        if (streak == null){
            if (result == 0){
            streak = '+';
            }
            else{
                streak = '-';
            }
        }
        if (direction == null){
            if (result == 0){
            direction = 'v';
            }
            else{
                direction = 'h';
            }
            console.log(streak);
            console.log(direction);
        }
        if(board.shipCount() == 0){
            document.getElementById('message').innerText = 'Message: Computer WINS';
            return
        }
        affectUserMap(aIFn, board, streak, direction, prev);
    }
    else if (board.coordinates.get(aim).occupied == false){
        user.classList.add("miss");
        document.getElementById('message').innerText = 'Message: Computer MISS';
    }
    document.querySelector('.blocker').style.display = 'none';
}
const domPlacedShips = function(board){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if (board.coordinates.get(`[${i},${j}]`).occupied == true){
                let user = document.querySelector(`.x${i}-${j}.player`);
                user.classList.add('user-occupied');
            }
        }
    }
}
const domPlacement = function(length, direction){ // redacted to be used in an update
    // map height is 40vh width 40vh
    let page = document.querySelector('body');
    console.log(page);
    let shipBlocks = document.createElement('div');
    shipBlocks.style.border = '1px solid black'
    page.append(shipBlocks);
    console.log(shipBlocks);
    for(let i = 0; i < length; i++){
        let block = document.createElement('div');
        block.style.backgroundColor = 'blue';
        block.style.width = '10%';
        block.style.flex = '1';
        block.style.border = '1px solid black';
        shipBlocks.append(block);
    }
    shipBlocks.style.height = '4vh';
    shipBlocks.style.width = `${4 * length}vh`;
    shipBlocks.style.display = 'flex';
    shipBlocks.setAttribute('draggable', 'true');
    shipBlocks.setAttribute('length', `${length}`);
    shipBlocks.setAttribute('direction', `${direction}`);
    shipBlocks.addEventListener('dragstart', (e)=> {
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        document.querySelector('#message').textContent ='dragging';
        shipBlocks.childNodes.forEach((element) => element.style.backgroundColor = 'green')});

shipBlocks.addEventListener('dragend', ()=> {document.querySelector('#message').textContent ='dragging';
shipBlocks.childNodes.forEach((element) => element.style.backgroundColor = 'blue')});
}
export{createMap, addListeners, affectUserMap, domPlacedShips};
