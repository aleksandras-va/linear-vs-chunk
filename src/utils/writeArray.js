import fs from 'fs';

const writeArray = (path, array) => {
  fs.writeFile(path, JSON.stringify(array), (error) => {
    if (error) {
      throw new Error(`Writing: ${error}`);
    }
  });
};

export { writeArray };
