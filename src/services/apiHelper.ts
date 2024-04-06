const baseURL = "http://localhost:3000/api";

const handleResponse = async <T>(response: Response) => {
  const json = await response.json();
  if (response.ok) {
    return { data: json, error: null };
  } else {
    return {
      data: null,
      error: {
        message: json.message || "Error occurred",
        status: response.status,
      },
    };
  }
};
export const get = async <T>(endPoint: string) => {
  try {
    const response = await fetch(`${baseURL}/${endPoint}`);
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: { message: "Unknown error", status: 500 } };
  }
};
export const post = async <T>(endPoint: string, body: any) => {
  try {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: { message: "Unknown error", status: 500 } };
  }
};
export const del = async <T>(endPoint: string) => {
  try {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: "DELETE",
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: { message: "Unknown error", status: 500 } };
  }
};
