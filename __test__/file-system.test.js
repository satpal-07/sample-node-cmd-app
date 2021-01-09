const testDirName = 'test';
jest.mock('../constants', () => ({
  get directory() {
    return testDirName;
  },
}));
jest.mock('../utils');
const utils = require('../utils');
const fileSystem = require('../file-system');
const fs = require('fs');
const combinedDirName = require('path').join(__dirname, '../' + testDirName);
const saveFileName = 'test-save-file.txt';

describe('Unit testing functions in file system', () => {
  const testFileName = 'test.txt';

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  afterAll(() => {
    if (fs.existsSync(combinedDirName))
      fs.rmdirSync(combinedDirName, { recursive: true });
  });

  test('Should create output folder', () => {
    fileSystem.createFolder();
    expect(fs.existsSync(combinedDirName)).toEqual(true);
  });

  test('Should return false when provided file name does not exist', async () => {
    const isFileFound = await fileSystem.checkFileExist('random.txt');
    expect(isFileFound).toEqual(false);
  });

  test('Should save file and return true when file is found is found', async () => {
    await fileSystem.saveFile('', testFileName);
    const isFileFound = await fileSystem.checkFileExist(testFileName);
    expect(isFileFound).toEqual(true);
  });

  test('Should return provided file name when file does not exist', async () => {
    const fileNamePassed = 'new-file.txt';
    const fileName = await fileSystem.getFileName(fileNamePassed);
    expect(fileName).toEqual(fileNamePassed);
  });

  test('Should return mocked file name when file is found with given file name', async () => {
    const generatedFileName = 'new-file-name.txt';
    utils.prompMessage.mockImplementationOnce(() =>
      Promise.resolve({
        append: false,
      })
    );
    utils.generateFileName.mockImplementationOnce(() => generatedFileName);
    jest.spyOn(fs.promises, 'access').mockImplementationOnce(() => Promise.resolve());
    const fileName = await fileSystem.getFileName(testFileName);
    expect(fileName).toEqual(generatedFileName);
  });

  test('Should save file with given content', async () => {
    const combinedSaveFileName = combinedDirName + '/' + saveFileName;
    const content = 'sample content';
    await fileSystem.saveFile(content, saveFileName);
    const readFile = fs.readFileSync(combinedSaveFileName, {
      encoding: 'utf-8',
    });
    expect(fs.existsSync(combinedSaveFileName)).toBe(true);
    expect(readFile).toBe(`${content}\n`);
  });

  test('Should throw an error when appendFile function fails', async () => {
    const mockErrorMessage = 'throwing mock error';
    jest.spyOn(fs.promises, 'appendFile').mockImplementationOnce(() => {
      throw new Error(mockErrorMessage);
    });
    try {
      await fileSystem.saveFile('', 'dummy.txt');
    } catch (error) {
      expect(error.message).toBe(`Error in saving file: ${mockErrorMessage}`);
    }
  });
});
