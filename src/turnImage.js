const getNewLocation = (x, y, size) => [size - 1 - y, x];

const generateChunks = (canvasSize, chunkSize) => {
  const totalChunks = Math.pow(canvasSize / chunkSize, 2);
  const chunkIncrement = chunkSize;
  const coordinateArray = [];

  let x = 0;
  let y = 0;

  for (let i = 0; i < totalChunks; i++) {
    coordinateArray.push([x, y]);

    if (x === canvasSize - chunkSize) {
      // Next row
      x = 0;
      y += chunkSize;
    } else {
      x += chunkSize;
    }
  }

  const detailedCoordinates = coordinateArray.map(([x, y]) => {
    return [
      [x, x + chunkIncrement],
      [y, y + chunkIncrement],
    ];
  });

  return detailedCoordinates;
};

const turnImageLinear = (matrix) => {
  const { length } = matrix;
  const result = Array.from({ length }, () => []);

  for (let oldX = 0; oldX < length; oldX++) {
    for (let oldY = 0; oldY < length; oldY++) {
      const [x, y] = getNewLocation(oldX, oldY, length);

      result[x][y] = matrix[oldX][oldY];
    }
  }

  // return result;
};

const turnImageByChunk = (matrix, chunkCoordinates) => {
  const { length } = matrix;
  const result = Array.from({ length }, () => []);

  chunkCoordinates.forEach(([coordinatesX, coordinatesY]) => {
    const [beginChunkX, endChunkX] = coordinatesX;
    const [beginChunkY, endChunkY] = coordinatesY;

    for (let oldX = beginChunkY; oldX < endChunkY; oldX++) {
      for (let oldY = beginChunkX; oldY < endChunkX; oldY++) {
        const [x, y] = getNewLocation(oldX, oldY, length);

        result[x][y] = matrix[oldX][oldY];
      }
    }
  });

  // return result;
};

export { turnImageLinear, turnImageByChunk, generateChunks };
