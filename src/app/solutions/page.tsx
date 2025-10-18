export const runtime = "edge";
import OtherSolutions from "@/components/OtherSolutions/OtherSolutions";
import { fetchFromStrapi } from "@/lib/strapi";

import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch only SEO data for metadata
    const homeRespData = await fetchFromStrapi("solutions?populate[0]=seo");
    const seoData = homeRespData?.data?.seo;

    if (!seoData) {
      throw new Error("No SEO data found");
    }

    // Parse keywords string into array
    const keywordsArray = seoData.keywords
      ? seoData.keywords.split(",").map((keyword: string) => keyword.trim())
      : [];

    // Parse robots meta tag if it's a string
    let robotsIndex = true;
    let robotsFollow = true;

    if (seoData.metaRobots && typeof seoData.metaRobots === "string") {
      const robotsMatch = seoData.metaRobots.match(/content="([^"]+)"/);
      if (robotsMatch) {
        const robotsContent = robotsMatch[1];
        robotsIndex = robotsContent.includes("index");
        robotsFollow = robotsContent.includes("follow");
      }
    }

    return {
      title:
        seoData.metaTitle ||
        "Corporate & Experiential Event Management Agency in India",
      description:
        seoData.metaDescription ||
        "JRNY is a leading corporate event management company in India.",
      keywords: keywordsArray,
      robots: {
        index: robotsIndex,
        follow: robotsFollow,
      },
      alternates: {
        canonical: seoData.canonicalURL || "https://jrnyxp.com/",
      },
      openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        url: seoData.canonicalURL || "https://jrnyxp.com/",
        siteName: "JRNY",
        images: [
          {
            url: "/jrny_logo.png",
            width: 1200,
            height: 630,
            alt: "JRNY Logo",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        images: ["/jrny_logo.png"],
      },
      // Add structured data if available
      ...(seoData.structuredData && {
        other: {
          "application/ld+json": JSON.stringify(seoData.structuredData),
        },
      }),
    };
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);

    // Fallback metadata
    return {
      title: "Corporate & Experiential Event Management Agency in India",
      description:
        "JRNY is a leading corporate event management company in India. We specialize in business events, conferences, MICE planning, product launches.",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://jrnyxp.com/",
      },
    };
  }
}

export default async function SolutionsPage() {
  let contentData = null;
  let contactUsData = null;

  //   const populate = [
  //     'Solutions',
  //   ];

  const contactUsPopulate = ["Form", "Form.locations", "Form.services"];

  //   const urlParams = new URLSearchParams();
  //   populate.forEach((value, index) => {
  //     urlParams.append(`populate[${index}]`, value);
  //   });

  const urlParamsContactUs = new URLSearchParams();
  contactUsPopulate.forEach((value, index) => {
    urlParamsContactUs.append(`populate[${index}]`, value);
  });

  try {
    const [contentRes, contactUsResp] = await Promise.all([
      fetchFromStrapi(`solutions?populate=*`),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);
    contentData = contentRes.data;
    contactUsData = contactUsResp.data;
    console.log({ contentData });
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="solutions-page-container">
      <OtherSolutions content={contentData} contactUs={contactUsData} />
    </div>
  );
}
