import PImage from 'pureimage';
import fs from 'fs';
import flattenDeep from 'lodash.flattendeep';

// import { readArray } from './utils/readArray.js';

const matrixToImage = async (matrix, suffix = 'final') => {
  // const flatMatrix = flattenDeep(await readArray(matrix));
  const { length: dimensions } = matrix;
  const flatMatrix = flattenDeep(matrix);
  const image = PImage.make(dimensions, dimensions);
  const { data } = image;
  const length = Math.pow(dimensions, 2) * 4;

  for (let i = 0; i < length; i++) {
    data[i] = flatMatrix[i];
  }

  PImage.encodePNGToStream(image, fs.createWriteStream(`./output/generated-${suffix}.png`))
    .then(() => {
      console.info('Wrote out the png file to out.png !');
    })
    .catch((e) => {
      console.warn('there was an error writing');
    });
};

export { matrixToImage };
