import { parse, HTMLElement } from 'node-html-parser';

/**
 * Interface defining the structure of the parsed HTML content.
 */
export interface ParsedHtmlContent {
  description: string;
  images: string[];
  video: string[];
  html: string;
}

/**
 * Parses an HTML string to extract description, image sources, video sources,
 * and the original HTML.
 *
 * @param htmlString A string containing HTML elements.
 * @returns An object conforming to the ParsedHtmlContent interface.
 */
export function parseHtmlContent(htmlString: string): ParsedHtmlContent {
  const root = parse(htmlString);

  // 1. Extract the description from the first <p> tag
  const firstParagraph = root.querySelector('p');
  const description = firstParagraph?.textContent.trim() || '';

  // 2. Extract all image sources
  const imageElements = root.querySelectorAll('img');
  const images = imageElements
    .map((img: any) => img.getAttribute('src'))
    .filter((src: any): src is string => !!src); // Filter out null/undefined src attributes

  // 3. Extract all video sources
  const videoElements = root.querySelectorAll('video');
  const videos = videoElements
    .map((video:any) => video.getAttribute('src'))
    .filter((src:any): src is string => !!src);

  // 4. Construct and return the final object
  return {
    description,
    images,
    video: videos,
    html: htmlString, // The original HTML for dangerously setting
  };
}