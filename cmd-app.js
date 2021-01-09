const { saveFile, getFileName, createFolder } = require('./file-system');
const { calculateAge, prompMessage } = require('./utils');
const yargs = require('yargs');

async function runCommandApp() {
  try {
    console.debug('Running the command app...');
    const options = parseArgs();
    if (!options['f-y']) {
      const prompt = await prompMessage(
        'In what year you would like to know your age by?',
        'year',
        'input'
      );

      options['f-y'] = (prompt && prompt.year) || '2040';
    }

    // check file name
    const fileName = await getFileName(options['f']);
    // calculate the age
    const calculatedAge = calculateAge(options['y'], options['f-y']);
    // create output folder
    createFolder()
    // save the file with the content
    await saveFile(`The age of ${options['n']} ${options['s'] ? options['s'] + ' ' : ''}in the year ${options['f-y']} is ${calculatedAge}`, fileName);
  } catch (error) {
    console.log(error.message);
    console.log('Stopping the execution due to an error!');
    process.exit(0);
  }
}

function parseArgs() {
  return yargs
    .option('n', {
      alias: 'name',
      describe: 'First name',
      type: 'string',
      demandOption: true,
    })
    .option('s', {
      alias: 'surname',
      describe: 'surname',
      type: 'string',
      demandOption: false,
    })
    .option('y', {
      alias: 'year-of-birth',
      describe: 'Year of birth',
      type: 'string',
      demandOption: true,
    })
    .option('f-y', {
      alias: 'future-year',
      describe: 'Future year',
      type: 'string',
      demandOption: false,
    })
    .option('m', {
      alias: 'funny-message',
      describe: 'Funny message',
      type: 'string',
      default: 'nothing',
      demandOption: false,
    })
    .option('f', {
      alias: 'file-name',
      describe: 'File name',
      type: 'string',
      demandOption: true,
    }).argv;
}

module.exports = { runCommandApp };
