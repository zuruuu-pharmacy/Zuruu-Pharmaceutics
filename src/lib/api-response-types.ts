// Common API response types for better type safety

export type ApiResponse<T> = T | { error: string };

export function isErrorResponse<T>(response: ApiResponse<T>): response is { error: string } {
  return response !== null && typeof response === 'object' && 'error' in response;
}

export function isSuccessResponse<T>(response: ApiResponse<T>): response is T {
  return response !== null && typeof response === 'object' && !('error' in response);
}

// Helper function to safely access properties
export function safeGet<T, K extends keyof T>(obj: T | { error: string }, key: K): T[K] | undefined {
  if (isErrorResponse(obj)) {
    return undefined;
  }
  return obj[key];
}

