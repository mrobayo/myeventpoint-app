const BASE_URL = 'http://localhost:8080';

export function fetchData(url: string, options: any): Promise<any> {
  return fetch(`${BASE_URL}${url}`);
}
