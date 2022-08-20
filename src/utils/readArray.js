import fs from 'fs';

const readArray = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject();
        throw new Error(`Reading: ${error}`);
      }

      const arrayString = data.toString();
      const array = eval(arrayString);

      console.info('Success reading array!');
      resolve(array);
    });
  });
};

export { readArray };
