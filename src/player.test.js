import{player} from "./player"
test('player attacks work', ()=>{
    const player1 = player();
    const player2 = player();
    player2.board.placeShip(3,'[0,0]', true, 'cruiser');
    player1.attack(player2.board,'[0,1]');
    expect(player2.board.ships.get('cruiser').hits).toBe(1);
});
