import { routes } from "@/lib/constants";

type TextChild = {
  text: string;
  type: string;
};

type Paragraph = {
  type: string;
  children: TextChild[];
};

type ContentItem = {
  id: number;
  documentId: string;
  contentTitle: string;
  textContent: Paragraph[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  key: string;
  jsonConfiguration: any;
};

type ExtractedContent = {
  contentTitle: string;
  text: string;
};

/**
 * Extracts contentTitle and plain text from the entry matching the provided key.
 * @param data - Array of content items.
 * @param key - The unique key to search by.
 * @returns The extracted content or null if not found.
 */
export const extractContentByKey = (
  data: ContentItem[],
  key: string
): ExtractedContent | null => {
  const item = data?.find((entry) => entry.key === key);

  if (!item) return null;

  const contentTitle = item.contentTitle;
  const text = item?.textContent
    ?.map((paragraph) =>
      paragraph?.children?.map((child) => child.text).join('')
    )
    .join('\n');

  return { contentTitle, text };
};

 

/**
 * Returns the path for a given route key.
 * @param key - The key of the route (e.g., 'home', 'portfolio', etc.)
 * @returns The path string or undefined if not found.
 */
export const getRoute = (key:string) => {
  const route = routes.find(route=> route.name=== key);
  return route?.path ?? routes[0].path;
};
 