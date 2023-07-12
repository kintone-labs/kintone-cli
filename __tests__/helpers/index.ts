import fs from 'fs';

export function createTempDir(TEMP_DIR: string) {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }
}

export function removeTempDir(TEMP_DIR: string) {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmdir(TEMP_DIR, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
