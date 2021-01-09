const fs = require('fs');
const path = require('path');
const { prompMessage, generateFileName } = require('./utils');
const { directory } = require('./constants');

async function saveFile(content, fileName = generateFileName()) {
  try {
    fileName = combineFileName(fileName);
    await fs.promises.appendFile(fileName, `${content}\n`);
    console.log(`File saved!`);
  } catch (err) {
    console.error(`Error in saving file: ${err.message}`);
    throw new Error(`Error in saving file: ${err.message}`);
  }
}

function checkFileExist(fileName) {
  fileName = combineFileName(fileName);
  return fs.promises
    .access(fileName)
    .then(() => true)
    .catch(() => false);
}

async function getFileName(fileName) {
  if (await checkFileExist(fileName)) {
    let prompt = await prompMessage(
      'File name provided exists. Do you like to add the content to existing file?',
      'append',
      'confirm'
    );
    if (!prompt.append) {
      fileName = generateFileName();
    }
    console.log(`File name will be used is ${fileName}`);
  }
  return fileName;
}

function createFolder() {
  fs.mkdirSync(path.join(__dirname, directory), { recursive: true });
}

function combineFileName(fileName) {
  return path.join(__dirname, directory, fileName);
}


module.exports = { saveFile, checkFileExist, getFileName, createFolder };
