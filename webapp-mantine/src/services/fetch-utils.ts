const BASE_URL = import.meta.env.VITE_MOCK_HOST;

const buildUrlEndpoint = (endpoint: string) => `${BASE_URL}${endpoint}`;

export function fetchData(url: string, options: any = {}): Promise<any> {
  return fetch(buildUrlEndpoint(url), options);
}
