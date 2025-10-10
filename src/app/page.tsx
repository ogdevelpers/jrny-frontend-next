export const runtime = 'edge';
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import { fetchFromStrapi } from "@/lib/strapi";
import LoaderWrapper from "./LoaderComponent";
import { extractContent } from "@/utils/process.util";
import { Metadata } from "next";



export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch only SEO data for metadata
    const homeRespData = await fetchFromStrapi('home?populate[0]=seo');
    const seoData = homeRespData?.data?.seo;
 
    if (!seoData) {
      throw new Error('No SEO data found');
    }

    // Parse keywords string into array
    const keywordsArray = seoData.keywords
      ? seoData.keywords.split(',').map((keyword: string) => keyword.trim())
      : [];

    // Parse robots meta tag if it's a string
    let robotsIndex = true;
    let robotsFollow = true;
    
    if (seoData.metaRobots && typeof seoData.metaRobots === 'string') {
      const robotsMatch = seoData.metaRobots.match(/content="([^"]+)"/);
      if (robotsMatch) {
        const robotsContent = robotsMatch[1];
        robotsIndex = robotsContent.includes('index');
        robotsFollow = robotsContent.includes('follow');
      }
    }

    return {
      title: seoData.metaTitle || 'Corporate & Experiential Event Management Agency in India',
      description: seoData.metaDescription || 'JRNY is a leading corporate event management company in India.',
      keywords: keywordsArray,
      robots: {
        index: robotsIndex,
        follow: robotsFollow,
      },
      alternates: {
        canonical: seoData.canonicalURL || 'https://jrnyxp.com/',
      },
      openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        url: seoData.canonicalURL || 'https://jrnyxp.com/',
        siteName: 'JRNY',
        images: [
          {
            url: '/jrny_logo.png',
            width: 1200,
            height: 630,
            alt: 'JRNY Logo',
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        images: ['/jrny_logo.png'],
      },
      // Add structured data if available
      ...(seoData.structuredData && {
        other: {
          'application/ld+json': JSON.stringify(seoData.structuredData),
        },
      }),
    };
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    
    // Fallback metadata
    return {
      title: 'Corporate & Experiential Event Management Agency in India',
      description: 'JRNY is a leading corporate event management company in India. We specialize in business events, conferences, MICE planning, product launches.',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://jrnyxp.com/',
      },
    };
  }
}

export default async function LandingPage() { 
  let homeData = null;

  let contactUsData = null;

   const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ]

    const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    })


  const populate = [
		'Hero',
    'Hero.Background_Image_Left',
    'Hero.Background_Image_Right',
    'Hero.ShowReelVideoLink',
    'Service.services',
    'Service.services.Thumbnail',
    'Form.services',
    'Form.locations',
    'Partner.brands',
    'Portfolio',
    'Portfolio.portfolios.thumbnail',
    'Why_Jrny.jrnies',
    'Testimonial.testimonials',
    'About' 
	];

  const populateCommon = `populate=*`;

  const urlParams = new URLSearchParams();
	populate.forEach((value, index) => {
		urlParams.append(`populate[${index}]`, value);
	});

  try {
    const [homeRespData,
      contactUsResp,
    ] = await Promise.all([
      fetchFromStrapi(`home?${urlParams.toString()}`),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);

    homeData = homeRespData.data;
    contactUsData = contactUsResp.data;
 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const extractedData = extractContent(homeData);

  return (
    <LoaderWrapper>
      <LandingPageContent 
        content={extractedData}
        footer={contactUsData}
      /> 
    </LoaderWrapper>
  )
}