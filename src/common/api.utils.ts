const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface RequestOptions {
  method: string;
  body?: any;
  headers?: HeadersInit;
  token?: string;
}

const request = async (
  url: string,
  { method, body, headers }: RequestOptions
) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers ? headers : {}),
    },
    ...(body && { body: JSON.stringify(body) }),
    credentials: 'include',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  if (!response.ok) {
    const DEFAULT_API_ERR_MSG = `Something went wrong, Error! Status: ${response.status}`;
    let toastMessage = DEFAULT_API_ERR_MSG;
    try {
      const { message } = await response.json();
      if (message) {
        toastMessage = message;
      }
    } catch {
      toastMessage = DEFAULT_API_ERR_MSG;
    }
    throw new Error(toastMessage);
  }
  return response.json();
};

export const api = {
  get: (url: string, headers?: any) => request(url, { method: 'GET', headers }),
  post: (url: string, body: any, headers?: any) =>
    request(url, { method: 'POST', body, headers }),
  put: (url: string, body: any, headers?: any) =>
    request(url, { method: 'PUT', body, headers }),
  patch: (url: string, body: any, headers?: any) =>
    request(url, { method: 'PATCH', body, headers }),
  delete: (url: string, headers?: any) =>
    request(url, { method: 'DELETE', headers }),
};
