const utils = require('../utils');
let stdin;

describe('Unit testing functions in utils folder', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  test('Should generate file name using date now', () => {
    const mockDate = new Date(1466424490000);
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const generatedFileName = utils.generateFileName();
    expect(generatedFileName).toEqual(mockDate.getTime() + '.txt');
    spy.mockRestore();
  });

  test('Should return calculated age', () => {
    const calculatedAge = utils.calculateAge(2000, 2020);
    expect(calculatedAge).toEqual(20);
  });

  test('Should return calculated age even when numbers are passed as string', () => {
    const calculatedAge = utils.calculateAge('2000', '2020');
    expect(calculatedAge).toEqual(20);
  });

  test('Should return error when year of birth param is not a number', () => {
    try {
      utils.calculateAge('random', 2020);
    } catch (error) {
      expect(error.message).toEqual('Provided years is not a number');
    }
  });

  test('Should return error when future year param is not a number', () => {
    try {
      utils.calculateAge(2000, 'random');
    } catch (error) {
      expect(error.message).toEqual('Provided years is not a number');
    }
  });

  test('Should return error when both params are not a number', () => {
    try {
      utils.calculateAge('random', 'random');
    } catch (error) {
      expect(error.message).toEqual('Provided years is not a number');
    }
  });

  test('Should return what the user types (stdin)', async () => {
    const typedInput = 'test input';
    let interval = setInterval(() => {
      stdin.send(`${typedInput}\r`);
    }, 0);
    const returnedInput = await utils.prompMessage(
      'This is input testing',
      'test',
      'input'
    );
    clearInterval(interval);
    expect(returnedInput).not.toBe(undefined);
    expect(returnedInput.test).not.toBe(undefined);
    expect(returnedInput.test).toBe(typedInput);
  });


  test('Should return true confirmation when user types y', async () => {
    let interval = setInterval(() => {
      stdin.send(`y\r`);
    }, 0);
    const returnedInput = await utils.prompMessage(
      'Is this confirm testing?',
      'confirmation',
      'confirm'
    );
    clearInterval(interval);
    expect(returnedInput).not.toBe(undefined);
    expect(returnedInput.confirmation).not.toBe(undefined);
    expect(returnedInput.confirmation).toBe(true);
  });

  test('Should return false what the user types n', async () => {
    let interval = setInterval(() => {
      stdin.send(`n\r`);
    }, 0);
    const returnedInput = await utils.prompMessage(
      'Is this confirm testing?',
      'confirmation',
      'confirm'
    );
    clearInterval(interval);
    expect(returnedInput).not.toBe(undefined);
    expect(returnedInput.confirmation).not.toBe(undefined);
    expect(returnedInput.confirmation).toBe(false);
  });

  test('Should return false what the user types random string', async () => {
    let interval = setInterval(() => {
      stdin.send(`anything\r`);
    }, 0);
    const returnedInput = await utils.prompMessage(
      'Is this confirm testing?',
      'confirmation',
      'confirm'
    );
    clearInterval(interval);
    expect(returnedInput).not.toBe(undefined);
    expect(returnedInput.confirmation).not.toBe(undefined);
    expect(returnedInput.confirmation).toBe(false);
  });
});
