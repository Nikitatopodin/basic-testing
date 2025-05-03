// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'something';
    expect(await resolveValue(value)).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'This is Error message';
    expect(() => throwError(errorMessage)).toThrow('This is Error message');
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(customError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = new MyAwesomeError();
    expect(() => rejectCustomError()).rejects.toThrow(customError);
  });
});
