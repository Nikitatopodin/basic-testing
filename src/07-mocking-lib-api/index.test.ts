// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({ throttle: jest.fn((fn) => fn) }));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue({});

    await throttledGetDataFromApi(baseURL);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const newURL = 'some_url';

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue({});

    await throttledGetDataFromApi(newURL);

    expect(axios.get).toHaveBeenCalledWith(newURL);
  });

  test('should return response data', async () => {
    const newURL = 'some_url';
    const response = 'data';

    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue({ data: response });

    const res = await throttledGetDataFromApi(newURL);

    expect(res).toBe(response);
  });
});
