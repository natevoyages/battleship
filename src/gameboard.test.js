import { gameboard } from "./gameboard";

test('createGameBoard method in board', () => {
    let board = gameboard();
    expect(board.coordinates.size).toBe(100);
});
test('placeship method', () => {
    let board = gameboard();
    board.placeShip(5, '[0,5]', true, 'cruiser' );
    expect(board.coordinates.get('[0,7]').occupied).toStrictEqual(true);
});

test('shipcount prop', () => {
    let board = gameboard();
    board.placeShip(3, '[0,5]', false, 'cruiser');
    expect(board.shipCount()).toStrictEqual(1);
});


test('receiveAttack method', () => {
    let board = gameboard();
    board.placeShip(3, '[0,5]', false, 'cruiser');
    board.receiveAttack('[0,5]');
    board.receiveAttack('[1,5]');

    expect(board.ships.get('cruiser').hits).toStrictEqual(2);
});

test('remove ship when sunk', () => {
    let board = gameboard();
    board.placeShip(3, '[0,5]', false, 'cruiser');
    board.receiveAttack('[0,5]');
    board.receiveAttack('[1,5]');
    board.receiveAttack('[2,5]');

    expect(board.ships.size).toBe(0);
});
