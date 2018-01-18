import * as g from './game';

it('creates a 2d array filled with char', () => {
  const room = g.array2d(3, 3, '#');
  expect(room).toEqual([
    [ '#', '#', '#' ],
    [ '#', '#', '#' ],
    [ '#', '#', '#' ]
  ]);
});

describe('transposition', () => {

  const area = g.newArea(6, 6);
  const room = g.newRoom(4, 4);

  it('transposes a room onto an area', () => {
    const res = g.transposeRoom(room, { y: 1, x: 1 }, area);
    expect(res).toEqual([
      [ '#', '#', '#', '#', '#', '#' ],
      [ '#', '.', '.', '.', '.', '#' ],
      [ '#', '.', '.', '.', '.', '#' ],
      [ '#', '.', '.', '.', '.', '#' ],
      [ '#', '.', '.', '.', '.', '#' ],
      [ '#', '#', '#', '#', '#', '#' ]
    ]);
  });

  it('doesn\'t transpose room when beyond area boundaries', () => {
    const res = g.transposeRoom(room, { y: 3, x: 3 }, area);
    expect(res).toEqual(area);
  });

  it('doesn\'t transpose room overlapping area edges', () => {
    const resOver = g.transposeRoom(room, { y: 2, x: 2 }, area);
    const resUnder = g.transposeRoom(room, { y: 0, x: 0 }, area);
    expect(resOver).toEqual(area);
    expect(resUnder).toEqual(area);
  });

});
