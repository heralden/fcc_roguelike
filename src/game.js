const wall = '#';
const space = '.';

export function array2d(width, height, char) {
  return Array(height).fill(
    Array(width).fill(char)
  );
}

export function copy2d(arr2d) {
  return arr2d.map(arr => arr.slice());
}

export function data2d(arr2d) {
  const ylim = arr2d.length;
  const xlim = arr2d[0].length;
  const squares = ylim * xlim;
  return { ylim, xlim, squares };
}

export function boundaryCoords(room, coord) {
  const roomData = data2d(room);
  const boundaryRoom = newRoom(
    roomData.xlim + 2,
    roomData.ylim + 2
  );

  let coords = [];
  boundaryRoom.forEach((row, y) => row.forEach((char, x) => {
    coords.push({ y: coord.y + y - 1, x: coord.x + x - 1 });
  }));
  return coords;
}

export function transposeRoom(room, coord, area) {
  const areaData = data2d(area);
  const roomData = data2d(room);
  // Do not overlap area edges or boundaries
  if (coord.y === 0 || coord.x === 0
    || roomData.ylim + coord.y >= areaData.ylim
    || roomData.xlim + coord.x >= areaData.xlim) {
    return area;
  }

  // Do not put room beside other rooms
  const isConflicting = boundaryCoords(room, coord)
    .some(c => area[c.y][c.x] === space);
  if (isConflicting) {
    return area;
  }

  // Transpose room
  newArea = copy2d(area);
  room.forEach((row, y) => row.forEach((char, x) => {
    const Y = coord.y + y;
    const X = coord.x + x;
    newArea[Y][X] = char;
  }));
  return newArea;
}

export function newRoom(width, height) {
  return array2d(width, height, space);
}

export function newArea(width, height) {
  return array2d(width, height, wall);
}

export function randomRoom() {
  const width = Math.floor(Math.random() * 5) + 2;
  const height = Math.floor(Math.random() * 5) + 2;
  return newRoom(width, height);
}
