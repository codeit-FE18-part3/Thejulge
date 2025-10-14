export function paramsSerializer(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      // address=강남구&address=서초구 형식으로 변경
      for (const v of value) usp.append(key, String(v));
    } else {
      usp.append(key, String(value));
    }
  }
  return usp.toString();
}
