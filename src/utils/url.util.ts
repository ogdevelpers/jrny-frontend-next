import { BASE_URL } from "@/lib/constants";

export const buildCanonicalUrl = (path?: string) => {
  if (!path) {
    return BASE_URL.endsWith("/")
      ? BASE_URL
      : `${BASE_URL}/`;
  }

  try {
    const url = new URL(path, BASE_URL);
    return url.toString();
  } catch {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_URL}${normalizedPath}`;
  }
};

