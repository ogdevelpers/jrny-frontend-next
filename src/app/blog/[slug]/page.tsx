export const runtime = 'edge';
import { BlogHero } from "@/components/Blogs/Blogs";
import Footer from "@/components/shared/footer/Footer";
import ShareOn from "@/components/ShareOn/ShareOn";
import { fetchFromStrapi } from "@/lib/strapi";
import '../../../css/blog-item.css'
import MinuteCount from "@/components/shared/MinuteCount";

import { Metadata } from "next";
import { buildCanonicalUrl } from "@/utils/url.util";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch only SEO data for metadata
    const homeRespData = await fetchFromStrapi('blogs?populate[0]=seo');
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

    const canonicalUrl = buildCanonicalUrl(`/blog/${slug}`);

    return {
      title: seoData.metaTitle || 'Corporate & Experiential Event Management Agency in India',
      description: seoData.metaDescription || 'JRNY is a leading corporate event management company in India.',
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
      title: 'Corporate & Experiential Event Management',
      description: 'JRNY is a leading corporate event management company in India. We specialize in business events, conferences, MICE planning, product launches.',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: buildCanonicalUrl(`/blog/${slug}`),
      },
    };
  }
}




const Blog: any = []; 


const HighlightedSentence = ({ text }:{text:string}) => {
  const words = text?.trim()?.split(' ');
  const lastTwo = words?.slice(-2).join(' ');
  const rest = words?.slice(0, -2).join(' ');

  return (
    <p className="sentance">
      {rest} <span className="highlight">{lastTwo}</span>
    </p>
  );
};

export default async function BlogItem({ params }: {params: Promise<{ slug: string }> }) {

  const { slug } = await params;

  let blogDetailData = null;
      let blogsData= null;
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
      
          try {
              const [
                  blogDetailRes,
                  blogsRes,
                  contactUsResp,
              ] = await Promise.all([
                  fetchFromStrapi(`blogs?filters[slug][$eq]=${slug}&populate=*`),
                  fetchFromStrapi('blogs?populate=*'),
                  fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
              ]);
             blogDetailData = blogDetailRes.data;
             blogsData = blogsRes.data;
             contactUsData = contactUsResp.data;
          } catch (error) {
              console.error('Error fetching data:', error);
          }

          const transformBlogsDetail = (data: any) => {
  return data.map((item: any) => ({
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    thumbnailUrl: item.thumbnail?.[0]?.formats?.thumbnail?.url
      ? `${item.thumbnail[0].formats?.thumbnail?.url}`
      : null,
    bgImageUrl: item.bgImage?.url
      ? `${item.bgImage.url}`
      : null,
    categories: item.categoriesses?.map((cat: any) => cat.name) || [],
    slug: item.slug
  }));
};

const transformBlogs = (data: any) => {
  return data.map((item: any) => ({
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    thumbnailUrl: item.thumbnail?.[0]?.formats?.thumbnail?.url
      ? `${item.thumbnail[0].formats?.thumbnail?.url}`
      : null,
    bgImageUrl: item.bgImage?.url
      ? `${item.bgImage.url}`
      : null,
    categories: item.categoriesses?.map((cat: any) => cat.name) || [],
    slug: item.slug
  }));
};

const data = transformBlogsDetail(blogDetailData);

const blogs = transformBlogs(blogsData);
  
  return (
    <>
    <div className="blog-item-container">
        <div className="blog-content-box">
          <section className="blog-item-header">
            <div className="blog-content-title">
                <HighlightedSentence text={data?.[0]?.title} />
                <div className="blog-item-caption">
              {data?.[0]?.shortDescription}
            </div>
            </div>
            
            <section className="blog-item-header-utils">
              <div className="blog-item-company-minute">
                <div className="blog-item-company-name">2025 - JRNY</div>
                <div className="blog-item-minute"><MinuteCount textString={data?.[0]?.description} /></div>
              </div>
              <div className="share-on">
                <ShareOn/>
            </div>
            </section>
            <img src="/landing_line.png" alt="" />
            {/* <img src="" alt="" /> */}
            
          </section>
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: data?.[0]?.description || '' }}>
                {/* {Blog.content} */}
            </div>
        </div>
    <div className="blog-item-bottom">
    <BlogHero route='derived' blogsData={blogs}/>
    <Footer content={contactUsData}/>
    </div>
    </div>
    </>
  )
}