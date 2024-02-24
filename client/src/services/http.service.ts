import env from "./config.service";

export interface HttpResponse<T> {
  status: number;
  data: T;
}

export interface HttpError {
  status: number;
  message: string;
}

function createIdPath(id: string | undefined) {
  return id ? `/${id}` : "";
}

function createHeader() {
  return {
    "Content-Type": "application/json",
  };
}

const BASE_URL = env().VOLO_API_URL;

export async function get<T>(
  endpoint: string,
  id?: string,
): Promise<HttpResponse<T> | HttpError> {
  try {
    const idPath = createIdPath(id);
    const response = await fetch(`${BASE_URL}${endpoint}${idPath}`);
    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText,
      } as HttpError;
    }
    const data = await response.json();
    return { data, status: response.status } as HttpResponse<T>;
  } catch (error) {
    return error as HttpError;
  }
}

export async function post<T>(
  endpoint: string,
  body: any,
): Promise<HttpResponse<T> | HttpError> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: createHeader(),
      body,
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText,
      } as HttpError;
    }
    const data = await response.json();
    return { data, status: response.status } as HttpResponse<T>;
  } catch (error) {
    return error as HttpError;
  }
}

export async function patch<T>(
  endpoint: string,
  body: any,
  id?: string,
): Promise<HttpResponse<T> | HttpError> {
  try {
    const idPath = createIdPath(id);
    const response = await fetch(`${BASE_URL}${endpoint}${idPath}`, {
      method: "PATCH",
      headers: createHeader(),
      body,
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText,
      } as HttpError;
    }
    const data = await response.json();
    return { data, status: response.status } as HttpResponse<T>;
  } catch (error) {
    return error as HttpError;
  }
}

export async function del<T>(
  endpoint: string,
  id?: string,
): Promise<HttpResponse<T> | HttpError> {
  try {
    const idPath = createIdPath(id);
    const response = await fetch(
      `${BASE_URL}${endpoint}${idPath}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText,
      } as HttpError;
    }
    const data = await response.json();
    return { data, status: response.status } as HttpResponse<T>;
  } catch (error) {
    return error as HttpError;
  }
}
