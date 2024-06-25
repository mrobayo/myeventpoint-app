const BASE_URL = 'http://localhost:8080';

const buildUrlEndpoint = (endpoint: string) => `${BASE_URL}${endpoint}`;

export function fetchData(url: string, options: any = {}): Promise<any> {
  return fetch(buildUrlEndpoint(url), options);
}
