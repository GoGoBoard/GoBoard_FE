class ApiError extends Error {
  constructor(json: unknown) {
    super(`API Error: ${JSON.stringify(json)}`);
  }
}

export function GetApi<ResponseType>(endpoint: string) {
  return async function () {
    const resp = await fetch(endpoint);
    const json = await resp.json();

    if (resp.status >= 300) {
      throw new ApiError(json);
    }

    return json as ResponseType;
  };
}

export function PostApi<ResponseType, BodyType>(endpoint: string) {
  return async function (body: BodyType) {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await resp.json();

    if (resp.status >= 300) {
      throw new ApiError(json);
    }

    return json as ResponseType;
  };
}

export function MockApi<ResponseType, BodyType>(response: ResponseType) {
  return function (body: BodyType) {
    void body;
    return Promise.resolve(response);
  };
}
