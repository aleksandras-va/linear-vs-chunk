function getNewLocation(x, y, width, height) {
  var newY = width - 1 - x;
  var newX = y;
  var newCoordinate = height * newY + newX;
  return newCoordinate;
}

const turnImageLinear = (pic) => {
  var { rgbaMatrix, width, height } = pic;
  var result = new Int32Array(width * height);

  var oldCoordinate = 0;
  for (let oldX = 0; oldX < width; oldX++) {
    for (let oldY = 0; oldY < height; oldY++) {
      const newCoordinate = getNewLocation(oldX, oldY, width, height);

      result[newCoordinate] = rgbaMatrix[oldCoordinate];
      ++oldCoordinate;
    }
  }

  return { rgbaMatrix: result, width, height };
};

function* generateChunks(canvasSize, chunkSize) {
  for (let x = 0; x < canvasSize; x += chunkSize) {
    for (let y = 0; y < canvasSize; y += chunkSize) {
      yield { x, y };
    }
  }
}

const turnImageByChunk = (matrix, chunkCoordinates, chunkSize) => {
  var { rgbaMatrix, width, height } = matrix;
  var result = new Int32Array(width * height);

  for (let imgX = 0; imgX < width; imgX += chunkSize) {
    for (let imgY = 0; imgY < width; imgY += chunkSize) {
      for (let incX = 0; incX < chunkSize; incX++) {
        let oldX = imgX + incX;
        for (let incY = 0; incY < chunkSize; incY++) {
          let oldY = (imgY + incY) | 0;

          const newCoordinate = getNewLocation(oldX, oldY, width);

          result[newCoordinate] = matrix[oldX + oldY * width];
        }
      }
    }
  }
  return result;
};

export { turnImageLinear, turnImageByChunk, generateChunks };
