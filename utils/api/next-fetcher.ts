import { getSession as getClientSession } from "next-auth/react"; // For client-side session
import { getServerSession } from "next-auth/next"; // For server-side session
import { authOptions } from "../functions/authentication/next-authOptions.function";

let cachedToken: string | null = null;
const abortControllers: Map<string, AbortController> = new Map();

// Function to get session on the server
const getServerSessionToken = async () => {
  if (cachedToken) return cachedToken;

  const session: any = await getServerSession(authOptions);
  cachedToken = session?.token?.access_token || null;
  return cachedToken;
};

// Function to get session on the client
const getClientSessionToken = async () => {
  if (cachedToken) return cachedToken;

  const session: any = await getClientSession();
  cachedToken = session?.token?.access_token || null;
  return cachedToken;
};

interface FetcherOptions {
  url: string;
  method?: string;
  body?: any;
  options?: any;
  useToken?: boolean;
  revalidate?: number;
  isServer?: boolean;
  requestId?: string; // Unique identifier for request cancellation
}

export const nextFetcher = async ({
  url,
  method = "GET",
  body,
  options = {},
  useToken = false,
  revalidate,
  isServer = false,
  requestId,
}: FetcherOptions) => {
  let headers: any = { ...options.headers };
  
  if (useToken) {
    const token = isServer
      ? await getServerSessionToken()
      : await getClientSessionToken();
    headers = {
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    };
  }

  if (body && method !== "GET" && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Create a new AbortController for the request if a unique requestId is provided
  const abortController = new AbortController();
  if (requestId) {
    abortControllers.set(requestId, abortController);
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    ...options,
    method,
    headers,
    body: body && method !== "GET"
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    next: revalidate ? { revalidate } : undefined,
    signal: abortController.signal,
  };

  if (options.onUploadProgress && body instanceof FormData) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Authorization", headers.Authorization || "");

      xhr.upload.onprogress = options.onUploadProgress || null;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`HTTP error! status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("Upload failed."));
      xhr.onabort = () => reject(new Error("Upload canceled"));

      abortController.signal.addEventListener("abort", () => xhr.abort());
      xhr.send(body);
    });
  }

  const response:any = await fetch(url, fetchOptions);

  // if (!response.success) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  return response.json();
};

// Function to cancel a specific request
export const cancelRequest = (requestId: string) => {
  const controller = abortControllers.get(requestId);
  if (controller) {
    controller.abort();
    abortControllers.delete(requestId); // Remove controller after aborting
  }
};
