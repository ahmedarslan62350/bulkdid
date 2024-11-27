import fs from "fs"

export function readLogFile(filePath:string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Failed to read log file: ${err.message}`);
        return;
      }
      resolve(data);
    });
  });
}
