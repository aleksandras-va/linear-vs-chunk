import { imageToMatrix } from './imageToMatrix.js';
import { matrixToImage } from './matrixToImage.js';
import { generateChunks, turnImageLinear, turnImageByChunk } from './turnImage.js';
import { measurePerformance } from './utils/measurePerformance.js';

const performanceMeasure = async () => {
  const matrix = await imageToMatrix('./public/shore-4000.png');
  const { length: imageSize } = matrix;
  const chunkSize = imageSize / 10;
  const chunkCoordinates = generateChunks(imageSize, chunkSize);

  const turnedImageByChunk = measurePerformance(turnImageByChunk, [matrix, chunkCoordinates]);
  const turnedImageLinear = measurePerformance(turnImageLinear, [matrix]);

  // matrixToImage(turnedImageLinear, 'linear');
  // matrixToImage(turnedImageByChunk, 'by-chunk');
};

performanceMeasure();
