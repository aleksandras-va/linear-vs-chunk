import { imageToMatrix } from './imageToMatrix.js';
import { matrixToImage } from './matrixToImage.js';
import { generateChunks, turnImageLinear, turnImageByChunk } from './turnImage.js';
import { measurePerformance } from './utils/measurePerformance.js';

const performanceMeasure = async () => {
  const matrix = await imageToMatrix('./public/shore-4000.png');
  const { length: imageSize } = matrix;
  const chunkSize = 16;

  var turnedImageLinear = measurePerformance(turnImageLinear, matrix);
  var turnedImageLinear = measurePerformance(turnImageLinear, matrix);
  // var turnedImageLinear = measurePerformance(turnImageLinear, matrix);
  //var turnedImageLinear = measurePerformance(turnImageLinear, matrix);
  //var turnedImageLinear = measurePerformance(turnImageLinear, matrix);
  matrixToImage(turnedImageLinear, 'linear');
  const chunkCoordinates = generateChunks(matrix.width, chunkSize);
  measurePerformance(turnImageByChunk, matrix, chunkCoordinates, chunkSize);
  measurePerformance(turnImageByChunk, matrix, chunkCoordinates, chunkSize);

  //matrixToImage(turnedImageByChunk, 'by-chunk');
};

performanceMeasure();
