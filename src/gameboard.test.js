import { gameboard } from "./gameboard";

test('createGameBoard method in board', () => {
    let board = gameboard();
    expect(board.coordinates.size).toBe(100);
});
test('placeship method', () => {
    let board = gameboard();
    board.placeShip(3, '[0,5]', true, 'cruiser' );
    expect(board.coordinates.get('[0,7]').occupied).toStrictEqual(true);
});

test('shipcount prop', () => {
    let board = gameboard();
    board.placeShip(3, '[0,5]', false, 'cruiser');
    expect(board.shipCount()).toStrictEqual(1);
});
