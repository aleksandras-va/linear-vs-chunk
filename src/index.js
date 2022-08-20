import { imageToMatrix } from './imageToMatrix.js';
import { matrixToImage } from './matrixToImage.js';
import { generateChunks, turnImageLinear, turnImageByChunk } from './turnImage.js';
import { measurePerformance } from './utils/measurePerformance.js';

const performanceMeasure = async () => {
  const matrix = await imageToMatrix('./public/shore-4000-min.png');
  const { length: imageSize } = matrix;
  const chunkSize = imageSize / 10;
  const chunkCoordinates = generateChunks(imageSize, chunkSize);

  const turnedImageLinear = measurePerformance(turnImageLinear, [matrix]);
  const turnedImageByChunk = measurePerformance(turnImageByChunk, [matrix, chunkCoordinates]);

  matrixToImage(turnedImageLinear, 'linear');
  matrixToImage(turnedImageByChunk, 'by-chunk');
};

performanceMeasure();
