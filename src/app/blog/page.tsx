import { BlogHero } from "@/components/Blogs/Blogs";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import "../../css/blog.css";

 

export default async function Blogs( ) {
    let blogsData= null;
  
    try {
      const [blogsRes] =await Promise.all([
            fetchFromStrapi('blogs?populate=*'),
          ]);
      blogsData = blogsRes.data;
    } catch (error){
      console.error('Error fetching data:', error);
    }

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

const data = transformBlogs(blogsData);
  return (
    <>
      <div className="blog-container">
        <BlogHero   blogsData={data} />
        <Footer />
      </div>
    </>
  );
}