import PImage from 'pureimage';
import fs from 'fs';
import flattenDeep from 'lodash.flattendeep';

// import { readArray } from './utils/readArray.js';

function extractComponents(rgba) {
    var r = (rgba | 0) & 255
    var g = (rgba | 0) >> 8 & 255
    var b = (rgba | 0) >> 16 & 255
    var a = (rgba | 0) >> 24 & 255
    return {r, g, b, a}
}

const matrixToImage = async (pic, suffix = 'final') => {
    // const flatMatrix = flattenDeep(await readArray(matrix));
    var {rgbaMatrix, width, height} = pic;
    const image = PImage.make(width, height, {});
    const {data} = image;
    var length = width * height
    var posDest = 0;
    for (let i = 0; i < length; i++) {
        var {r, g, b, a} = extractComponents(rgbaMatrix[i])
        data[posDest] = r;
        data[posDest + 1] = g;
        data[posDest + 2] = b;
        data[posDest + 3] = a;
        posDest += 4
    }

    PImage.encodePNGToStream(image, fs.createWriteStream(`./output/generated-${suffix}.png`))
        .then(() => {
            console.info('Wrote out the png file to out.png !');
        })
        .catch((e) => {
            console.warn('there was an error writing');
        });
};

export {matrixToImage};
