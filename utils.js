const inquirer = require('inquirer');

async function prompMessage(message, name, type) {
  const response = await inquirer.prompt({
    name,
    type,
    message,
  });
  return response;
}

function calculateAge(yearOfBirth, futureYear) {
  if(!isNumber(yearOfBirth) || !isNumber(futureYear)) throw new Error('Provided years is not a number');
  return futureYear - yearOfBirth;
}

function generateFileName() {
  return new Date().getTime() + '.txt';
}

function isNumber(param) {
  return !isNaN(param);
}

module.exports = { prompMessage, calculateAge, generateFileName };
