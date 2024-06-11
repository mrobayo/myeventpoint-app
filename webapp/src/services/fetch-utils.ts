
const BASE_URL = 'http://localhost:8080';

export function fetchData(url: string): Promise<any> {
  return fetch(`${BASE_URL}${url}`);
}
