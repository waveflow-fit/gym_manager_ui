const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface RequestOptions {
  method: string;
  body?: any;
  headers?: HeadersInit;
  token?: string;
}

const request = async (
  url: string,
  { method, body, headers, token }: RequestOptions
) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  get: (url: string, token?: string) => request(url, { method: 'GET', token }),
  post: (url: string, body: any, token?: string) =>
    request(url, { method: 'POST', body, token }),
  put: (url: string, body: any, token?: string) =>
    request(url, { method: 'PUT', body, token }),
  patch: (url: string, body: any, token?: string) =>
    request(url, { method: 'PATCH', body, token }),
  delete: (url: string, token?: string) =>
    request(url, { method: 'DELETE', token }),
};
