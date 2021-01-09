const { exec } = require('child_process');
const fs = require('fs');
const testFileName = 'integration-test.txt';
const testDirName = 'output';

const combinedDirName = require('path').join(__dirname, '../' + testDirName);

describe('cli using output to stdout', () => {

  afterAll(() => {
    if (fs.existsSync(combinedDirName))
      fs.rmdirSync(combinedDirName, { recursive: true });
  });
  test('should return success message in the stdout after saving', (done) => {
    exec(
      `./index.js -n Satpal -s Singh -y 1992 --f-y 2030 -f ${testFileName}`,
      (error, stdout, stderr) => {
        const file = fs.readFileSync(combinedDirName+'/'+ testFileName, 'utf-8');
        expect(file).toEqual('The age of Satpal Singh in the year 2030 is 38\n');
        expect(stdout).toEqual("Running the command app...\nFile saved!\n");
        done();
      }
    );
  });
});