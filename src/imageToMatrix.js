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
    var bmp = jimpImage.bitmap;
    const rgbaMatrix = new Int32Array(bmp.width * bmp.height);
    var w = bmp.width;

    const pixelHandler = (x, y, idx) => {
      const blue = jimpImage.bitmap.data[idx + 0];
      const green = jimpImage.bitmap.data[idx + 1];
      const red = jimpImage.bitmap.data[idx + 2];
      const alpha = jimpImage.bitmap.data[idx + 3];
      const pixelData = red + (green << 8) + (blue << 16) + (alpha << 24);
      rgbaMatrix[w * y + x] = pixelData;
    };

    jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, pixelHandler.bind(this));

    return { rgbaMatrix, width: bmp.width, height: bmp.height };
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
