export const runtime = "edge";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import "../../../css/solutions-item.css";
import { Metadata } from "next";
import { buildCanonicalUrl } from "@/utils/url.util";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^solutions\//, '');

  try {
    // Fetch only SEO data for metadata
    const homeRespData = await fetchFromStrapi(
      `solutions?filters[slug][$eq]=${slug}&populate[0]=seo`,
    );
    const seoData = homeRespData?.data?.[0]?.seo;

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

    const canonicalUrl = buildCanonicalUrl(`/solutions/${slug}`);

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
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        url: canonicalUrl,
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
        canonical: buildCanonicalUrl(`/solutions/${slug}`),
      },
    };
  }
}

export default async function SolutionsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^solutions\//, '');

  let solutionDetailData = null;
  let contactUsData = null;

  const contactUsPopulate = ["Form", "Form.locations", "Form.services"];
  const solutionPopulate = ["faq", "faq.items", "seo"];
  const urlParamsSolution = new URLSearchParams();
  urlParamsSolution.append("filters[slug][$eq]", slug);
  solutionPopulate.forEach((value, index) => {
    urlParamsSolution.append(`populate[${index}]`, value);
  });

  const urlParamsContactUs = new URLSearchParams();
  contactUsPopulate.forEach((value, index) => {
    urlParamsContactUs.append(`populate[${index}]`, value);
  });

  try {
    const [solutionDetailRes, contactUsResp] = await Promise.all([
      fetchFromStrapi(`solutions?${urlParamsSolution.toString()}`),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);
    solutionDetailData = solutionDetailRes.data;
    contactUsData = contactUsResp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const solutionData = solutionDetailData?.[0];

  console.log('solutionData******', solutionData);

  return (
    <>
      <div className="solutions-item-container">
        <div className="solutions-content-box">
          <section className="solutions-item-header">
            <div className="solutions-content-title">
              <h1 className="solution-title">{solutionData?.title || ""}</h1>
              <div className="solution-caption">
                {solutionData?.shortDescription || ""}
              </div>
            </div>
            <img src="/landing_line.png" alt="" />
          </section>
          <div
            className="rich-content"
            dangerouslySetInnerHTML={{
              __html: solutionData?.description || "",
            }}
          ></div>
          {solutionData?.faq?.items && solutionData.faq.items.length > 0 && (
            <FAQAccordion 
              items={solutionData.faq.items} 
              title={solutionData.faq.title || "Frequently Asked Questions"}
            />
          )}
        </div>
        <div className="solutions-item-footer">
          <Footer content={contactUsData} />
        </div>
      </div>
    </>
  );
}
