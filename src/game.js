const wall = '#';
const space = '.';

function array2d(width, height, char) {
  return Array(height).fill(
    Array(width).fill(char)
  );
}

function copy2d(arr2d) {
  return arr2d.map(arr => arr.slice());
}

function data2d(arr2d) {
  const ylim = arr2d.length;
  const xlim = arr2d[0].length;
  const squares = ylim * xlim;
  return { ylim, xlim, squares };
}

function boundaryCoords(room, coord) {
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

function transposeRoom(room, coord, area) {
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

function newRoom(width, height) {
  return array2d(width, height, space);
}

function newArea(width, height) {
  return array2d(width, height, wall);
}

function randomNumber(min, max) {
  const factor = max - min;
  return Math.floor(
    Math.random() * factor
  ) + min;
}

function randomRoom() {
  const width = randomNumber(2, 7);
  const height = randomNumber(2, 7);
  return newRoom(width, height);
}

function randomCoord(area) {
  const data = data2d(area);
  return {
    y: randomNumber(1, data.ylim - 1),
    x: randomNumber(1, data.xlim - 1)
  };
}

function fillArea(area, attempts) {
  for (let i = 0; i < attempts; i++) {
    area = transposeRoom(
      randomRoom(),
      randomCoord(area),
      area
    );
  }
  return area;
}

export { array2d, transposeRoom, newRoom, newArea };
