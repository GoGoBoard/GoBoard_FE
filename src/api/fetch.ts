class ApiError extends Error {
  constructor(json: unknown) {
    super(`API Error: ${JSON.stringify(json)}`);
  }
}

export async function GetApi<ResponseType>(endpoint: string) {
  const resp = await fetch(`${import.meta.env.VITE_API_HOST}${endpoint}`);
  const json = await resp.json();

  if (resp.status >= 300) {
    throw new ApiError(json);
  }

  return json as ResponseType;
}

export async function PostApi<ResponseType, BodyType>(
  endpoint: string,
  body: BodyType,
) {
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
}

export function MockApi<ResponseType, BodyType>(
  response: ResponseType,
  failRatio: number = 0,
) {
  return function (body: BodyType) {
    void body;
    console.log(body);
    return new Promise<ResponseType>((resolve, reject) => {
      if (Math.random() < failRatio) reject();
      setTimeout(() => resolve(response), 1000);
    });
  };
}
