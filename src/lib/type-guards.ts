// Type guard utilities for handling API responses

export function hasError<T>(response: T | { error: string }): response is { error: string } {
  return response !== null && typeof response === 'object' && 'error' in response;
}

export function hasSuccess<T>(response: T | { error: string }): response is T {
  return response !== null && typeof response === 'object' && !('error' in response);
}

