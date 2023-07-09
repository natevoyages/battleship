import { createBattleShip } from "./battleship";

test('hit works', () => {
  let cruiser = createBattleShip(1);
  cruiser.hit();
expect(cruiser.hits).toBe(1);
});

test('isSunk returns true', () => {
  let cruiser = createBattleShip(1);
  cruiser.hit();
  expect(cruiser.isSunk()).toBe(true);
});

test('isSunk returns false', () => {
let cruiser = createBattleShip(1);
expect(cruiser.isSunk()).toBe(false);
})