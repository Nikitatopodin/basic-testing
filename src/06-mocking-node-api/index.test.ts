// Uncomment the code below and write your tests
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs');
jest.mock('fs/promises');

const callback = jest.fn();
const timeout = 3000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervals = 4;

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout * intervals);

    expect(callback).toHaveBeenCalledTimes(intervals);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'some_directory/some_file';
  const fileContent = 'This is content of the file';

  test('should call join with pathToFile', async () => {
    const joinPathSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinPathSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const content = await readFileAsynchronously(pathToFile);

    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(readFile).mockResolvedValue(fileContent);

    const content = await readFileAsynchronously(pathToFile);

    expect(content).toBe(fileContent);
  });
});
