// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  const values1 = ['q', 'w', 'e', 'r', 't', 'y'];
  const values2 = [1, 2, 3, 4, 5, 6];

  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      value: 'q',
      next: {
        value: 'w',
        next: {
          value: 'e',
          next: {
            value: 'r',
            next: {
              value: 't',
              next: {
                value: 'y',
                next: {
                  value: null,
                  next: null,
                },
              },
            },
          },
        },
      },
    };

    expect(generateLinkedList(values1)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values2)).toMatchSnapshot();
  });
});
