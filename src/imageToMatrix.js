import Jimp from 'jimp';
import { writeArray } from './utils/writeArray.js';

/**
 *
 * @param {string} input
 * @param {string} output
 */
const imageToMatrix = async (input, output) => {
  const readImage = (imageSrc) => {
    return Jimp.read(imageSrc);
  };

  const scanToRgbaMatrix = (jimpImage) => {
    const rgbaMatrix = [];

    const pixelHandler = (x, y, idx) => {
      const green = jimpImage.bitmap.data[idx + 1];
      const red = jimpImage.bitmap.data[idx + 0];
      const blue = jimpImage.bitmap.data[idx + 2];
      const alpha = jimpImage.bitmap.data[idx + 3];

      if (!rgbaMatrix[y]) {
        rgbaMatrix[y] = [];
      }

      rgbaMatrix[y][x] = [red, green, blue, alpha];
    };

    jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, pixelHandler.bind(this));

    return rgbaMatrix;
  };

  const imageToRgbaMatrix = (imageSrc) => {
    return readImage(imageSrc).then(scanToRgbaMatrix);
  };

  const matrix = await imageToRgbaMatrix(input);
  return await imageToRgbaMatrix(input);
  writeArray(output, matrix);

  console.info(input, 'written');
};

export { imageToMatrix };
