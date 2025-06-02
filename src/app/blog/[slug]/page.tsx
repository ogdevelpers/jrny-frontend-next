import { BlogHero } from "@/components/Blogs/Blogs";
import Footer from "@/components/shared/footer/Footer";
import ShareOn from "@/components/ShareOn/ShareOn";
import { fetchFromStrapi } from "@/lib/strapi";
import '../../../css/blog-item.css'
import MinuteCount from "@/components/shared/MinuteCount";

const Blog: any = []; 


const HighlightedSentence = ({ text }:{text:string}) => {
  const words = text?.trim().split(' ');
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
      
          try {
              const [
                  blogDetailRes,
                  blogsRes
              ] = await Promise.all([
                  fetchFromStrapi(`blogs?filters[slug][$eq]=${slug}&populate=*`),
                  fetchFromStrapi('blogs?populate=*'),
              ]);
             blogDetailData = blogDetailRes.data;
             blogsData = blogsRes.data;
      
          } catch (error) {
              console.error('Error fetching data:', error);
          }

          const transformBlogsDetail = (data: any) => {
  return data.map((item: any) => ({
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    thumbnailUrl: item.thumbnail?.[0]?.formats?.thumbnail?.url
      ? `${process.env.STRAPI_URL}${item.thumbnail[0].formats?.thumbnail?.url}`
      : null,
    bgImageUrl: item.bgImage?.url
      ? `${process.env.STRAPI_URL}${item.bgImage.url}`
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
      ? `${process.env.STRAPI_URL}${item.thumbnail[0].formats?.thumbnail?.url}`
      : null,
    bgImageUrl: item.bgImage?.url
      ? `${process.env.STRAPI_URL}${item.bgImage.url}`
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
            <div dangerouslySetInnerHTML={{ __html: data?.[0]?.description }}>
                {/* {Blog.content} */}
            </div>
        </div>
    <div className="blog-item-bottom">
    <BlogHero route='derived' blogsData={blogs}/>
    <Footer/>
    </div>
    </div>
    </>
  )
}