export const fetchFromStrapi = async (path: string) => {
  const baseUrl = process.env.STRAPI_URL;

  const res = await fetch(`${baseUrl}/api/${path}`, {
    next: { revalidate: 60 }, // For ISR, remove this line for pure SSG
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${path}`);
  }

  const json = await res.json();
  return json;
};
