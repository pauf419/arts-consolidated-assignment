export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FetchOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

export async function fetchWithRetry<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { retries = 3, retryDelay = 1000, timeout = 10000 } = options;

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          response.statusText
        );
      }

      return await response.json();
    } catch (error) {
      const isLastRetry = i === retries - 1;

      if (isLastRetry) {
        if (error instanceof ApiError) {
          throw error;
        }
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            throw new ApiError("Request timeout");
          }
          throw new ApiError(`Network error: ${error.message}`);
        }
        throw new ApiError("Unknown error occurred");
      }

      // WAIT BEFORE RETRY
      await new Promise((resolve) => setTimeout(resolve, retryDelay * (i + 1)));
    }
  }

  throw new ApiError("Failed after all retries");
}
